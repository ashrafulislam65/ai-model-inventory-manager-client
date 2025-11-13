import React, { use, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router';

const LogIn = () => {
    const { signInWithGoogle, signInUser } = use(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
    };

    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signInUser(formData.email, formData.password);
            navigate('/');
        } catch (error) {
            
            setError(error.message || 'Failed to sign in. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = () => {
        setLoading(true);
        setError('');

        signInWithGoogle()
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(error => {
                
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="card my-20 mx-auto bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-3xl text-center font-bold mb-6">Welcome Back</h1>
                    <p className="text-center text-gray-600 mb-8">
                        Sign in to your AI Model Inventory Manager account
                    </p>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleEmailPasswordLogin}>
                        <fieldset className="fieldset space-y-4">
                            <div>
                                <label className="label">
                                    <span className="label-text">Email</span>
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
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label className="label">
                                    <span className="label-text-alt link link-hover">Forgot password?</span>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full mt-4"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
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
                        Don't have an account?{' '}
                        <Link to="/register" className="link link-primary">
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LogIn;