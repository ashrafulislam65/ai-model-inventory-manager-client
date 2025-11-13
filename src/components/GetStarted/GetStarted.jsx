import React from 'react';
import { Link } from 'react-router';

const GetStarted = () => {
    return (
        <section className="py-20 bg-linear-to-br from-gray-900 via-purple-900 to-blue-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Main Content */}
                    <div className="bg-white bg-opacity-5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white border-opacity-10 shadow-2xl">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                            Start Your <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">AI Journey</span> Today
                        </h2>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Join our community of AI enthusiasts and take control of your machine learning projects.
                            Manage, share, and discover AI models in one powerful platform.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">10K+</div>
                                <div className="text-blue-300 text-sm">AI Models</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">5K+</div>
                                <div className="text-purple-300 text-sm">Developers</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white">100+</div>
                                <div className="text-green-300 text-sm">Frameworks</div>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
                            <Link
                                to="/register"
                                className="group bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center flex-1 min-w-[200px]"
                            >
                                <span className="mr-3 group-hover:scale-110 transition-transform"></span>
                                Create Account
                                <span className="ml-3 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>

                            <Link
                                to="/login"
                                className="group bg-transparent border-2 border-white border-opacity-30 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:bg-opacity-10 hover:border-opacity-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center flex-1 min-w-[200px]"
                            >
                                <span className="mr-3"></span>
                                Existing User?
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-8 pt-6 border-t border-white border-opacity-10">
                            <p className="text-gray-400 text-sm flex items-center justify-center gap-4 flex-wrap">
                                <span className="flex items-center gap-1">
                                    <span></span> Secure & Private
                                </span>
                                <span className="flex items-center gap-1">
                                    <span></span> Instant Setup
                                </span>
                                <span className="flex items-center gap-1">
                                    <span></span> No Credit Card
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GetStarted;