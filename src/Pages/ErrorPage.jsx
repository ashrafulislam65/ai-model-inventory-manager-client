import React, { useEffect } from 'react';
import { Link, useNavigate, useRouteError } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();

    useEffect(() => {
        // Log error for debugging, but don't show in console to users
        if (error) {
            console.error('Routing error:', error);
        }
    }, [error]);

    const handleGoHome = () => {
        navigate('/');
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
                {/* Error Icon */}
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Oops! This AI model doesn't exist.
                </h2>

                <p className="text-gray-600 mb-8">
                    The page you're looking for seems to have wandered off into the digital void.
                    Don't worry, even the best AI models sometimes get lost!
                </p>

                {/* Action Buttons */}
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                    <button
                        onClick={handleGoHome}
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                         Return to Home
                    </button>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                    >
                         Go Back
                    </button>
                </div>

                {/* Additional Help */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Need help? <Link to="/contact" className="text-blue-500 hover:text-blue-600 underline">Contact our support team</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;