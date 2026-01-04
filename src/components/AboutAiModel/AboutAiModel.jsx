import React from 'react';

const AboutAiModel = () => {
    return (
        <section className="py-16 lg:px-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        What Are <span className="text-blue-600">AI Models</span>?
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        The Building Blocks of Artificial Intelligence
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-6">
                        <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                 Understanding AI Models
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                AI models are mathematical frameworks that enable machines to learn from data and make intelligent decisions.
                                They are the core components of machine learning systems, trained to recognize patterns, make predictions,
                                and solve complex problems without explicit programming.
                            </p>
                        </div>

                        <div className="bg-linear-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                 Neural Networks & Deep Learning
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Modern AI models often use neural networks - computational systems inspired by the human brain.
                                These networks consist of interconnected layers that process information, enabling breakthroughs in:
                            </p>
                            <ul className="mt-4 space-y-2 text-gray-700">
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                    Image and speech recognition
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                    Natural language processing
                                </li>
                                <li className="flex items-center">
                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                                    Autonomous decision making
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="space-y-6">
                        <div className="bg-linear-to-br from-purple-50 to-pink-100 p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                 Real-World Applications
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-500 text-white p-3 rounded-lg">
                                        
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Chatbots & Virtual Assistants</h4>
                                        <p className="text-gray-700 text-sm mt-1">
                                            NLP models power conversational AI that understands and responds to human language naturally.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-500 text-white p-3 rounded-lg">
                                        
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Image Recognition</h4>
                                        <p className="text-gray-700 text-sm mt-1">
                                            Computer vision models identify objects, faces, and patterns in images and videos.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-500 text-white p-3 rounded-lg">
                                        
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Predictive Analytics</h4>
                                        <p className="text-gray-700 text-sm mt-1">
                                            ML models forecast trends, detect anomalies, and make data-driven predictions.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-500 text-white p-3 rounded-lg">
                                        
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Healthcare & Medicine</h4>
                                        <p className="text-gray-700 text-sm mt-1">
                                            AI models assist in disease diagnosis, drug discovery, and medical image analysis.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-linear-to-br from-orange-50 to-red-100 p-8 rounded-2xl shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                 Importance in Modern Technology
                            </h3>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                AI models are revolutionizing industries by automating complex tasks, providing insights from big data,
                                and creating intelligent systems that enhance human capabilities. They form the foundation of modern
                                artificial intelligence applications that are transforming our world.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-blue-600 mb-2">100M+</div>
                        <div className="text-gray-600">AI Models Created</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                        <div className="text-gray-600">Industries Transformed</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-gray-600">Continuous Learning</div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                        <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                        <div className="text-gray-600">Future Possibilities</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAiModel;