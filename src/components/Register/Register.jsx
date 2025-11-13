import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';

const Register = () => {
    const { signInWithGoogle, createUser } = use(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photoURL: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate();

    // Password validation rules
    const validatePassword = (password) => {
        const errors = [];

        if (password.length < 6) {
            errors.push('Must be at least 6 characters long');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Must contain at least one lowercase letter');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Must contain at least one uppercase letter');
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Validate password in real-time
        if (name === 'password') {
            const errors = validatePassword(value);
            setPasswordErrors(errors);
        }

        setError(''); // Clear general error when user starts typing
        setShowToast(false); // Hide toast when user starts typing
    };

    const showErrorToast = (message) => {
        setError(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000); // Hide after 5 seconds
    };

    const handleEmailPasswordRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setShowToast(false);

        // Basic validation
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            showErrorToast('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Password validation
        const passwordValidationErrors = validatePassword(formData.password);
        if (passwordValidationErrors.length > 0) {
            setPasswordErrors(passwordValidationErrors);
            showErrorToast('Please fix password errors to continue');
            setLoading(false);
            return;
        }

        // Confirm password validation
        if (formData.password !== formData.confirmPassword) {
            showErrorToast("Passwords don't match");
            setLoading(false);
            return;
        }

        try {
            // Create user in Firebase Authentication
            const result = await createUser(formData.email, formData.password);

            // Prepare user data for database
            const newUser = {
                name: formData.name,
                email: formData.email,
                photoURL: formData.photoURL || result.user.photoURL || '',
                uid: result.user.uid,
                createdAt: new Date().toISOString()
            };

            // Save user to your database
            const response = await fetch('https://ai-inventory-model-manager-server.vercel.app/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            const data = await response.json();
            console.log("User saved to database:", data);

            // Show success message and redirect
            setError('');
            navigate('/');

        } catch (error) {
            
            let errorMessage = 'Failed to create account. Please try again.';

            // Firebase specific error messages
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'This email is already registered. Please use a different email or sign in.';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password is too weak. Please use a stronger password.';
            }

            showErrorToast(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        setError('');
        setShowToast(false);

        signInWithGoogle()
            .then(result => {
                
                const newUser = {
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                    createdAt: new Date().toISOString()
                }

                // Create user in the database
                return fetch('https://ai-inventory-model-manager-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
            })
            .then(res => res.json())
            .then(data => {
                console.log("User saved after Google sign in:", data);
                navigate('/');
            })
            .catch(error => {
                
                showErrorToast(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Password strength indicator
    const getPasswordStrength = (password) => {
        if (password.length === 0) return { strength: 0, color: 'bg-gray-200' };

        const errors = validatePassword(password);
        const strength = 4 - errors.length; // 4 possible criteria

        if (strength <= 1) return { strength, color: 'bg-red-500' };
        if (strength <= 2) return { strength, color: 'bg-orange-500' };
        if (strength <= 3) return { strength, color: 'bg-yellow-500' };
        return { strength: 4, color: 'bg-green-500' };
    };

    const passwordStrength = getPasswordStrength(formData.password);
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            {/* Toast Notification */}
            {showToast && (
                <div className="toast toast-top toast-center z-50">
                    <div className="alert alert-error">
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                        <button onClick={() => setShowToast(false)} className="btn btn-ghost btn-xs">✕</button>
                    </div>
                </div>
            )}

            <div className="card my-20 mx-auto bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold mb-6">Create Account</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Join AI Model Inventory Manager today
                    </p>

                    <form onSubmit={handleEmailPasswordRegister}>
                        <fieldset className="fieldset space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Full Name *</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Email *</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Photo URL (Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    className="input input-bordered w-full"
                                    placeholder="Paste your photo URL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Password *</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`input input-bordered w-full ${formData.password && passwordErrors.length > 0 ? 'input-error' : ''
                                        }`}
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex space-x-1 mb-2">
                                            {[1, 2, 3, 4].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`h-2 flex-1 rounded transition-all ${index <= passwordStrength.strength
                                                        ? passwordStrength.color
                                                        : 'bg-gray-200'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                <div className="mt-2 space-y-1">
                                    <div className={`text-xs flex items-center ${formData.password.length >= 6 ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {formData.password.length >= 6 ? '✓' : '○'} At least 6 characters
                                    </div>
                                    <div className={`text-xs flex items-center ${/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {/(?=.*[a-z])/.test(formData.password) ? '✓' : '○'} One lowercase letter
                                    </div>
                                    <div className={`text-xs flex items-center ${/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'
                                        }`}>
                                        {/(?=.*[A-Z])/.test(formData.password) ? '✓' : '○'} One uppercase letter
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="label">
                                    <span className="label-text">Confirm Password *</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`input input-bordered w-full ${formData.confirmPassword && formData.password !== formData.confirmPassword
                                        ? 'input-error'
                                        : ''
                                        }`}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">Passwords don't match</span>
                                    </label>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                                disabled={loading || passwordErrors.length > 0}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider">OR</div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="btn bg-white text-black border-gray-300 hover:bg-gray-50 w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner"></span>
                        ) : (
                            <>
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <g>
                                        <path d="m0 0H512V512H0" fill="#fff"></path>
                                        <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                        <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                        <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                        <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                                    </g>
                                </svg>
                                Continue with Google
                            </>
                        )}
                    </button>

                    <p className="text-center mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="link link-primary">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;