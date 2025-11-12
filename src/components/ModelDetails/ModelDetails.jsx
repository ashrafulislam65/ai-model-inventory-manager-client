
import { useLoaderData } from 'react-router';

const ModelDetails = () => {
    const model = useLoaderData();
    const { name, framework, useCase, dataset, description, image, purchased, } = model;
    console.log(model);
    return (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4 py-12">
            <div className="max-w-5xl px-5 w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-purple-700/30 hover:scale-[1.01]">

                {/* Main Flex Layout */}
                <div className="flex flex-col md:flex-row items-center">

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 relative overflow-hidden">
                        <img
                            src={image}
                            alt={name}
                            className="w-full rounded-2xl h-80 md:h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-10 space-y-5 text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-bold text-purple-400 tracking-wide drop-shadow-md">
                            {name}
                        </h1>

                        <div className="flex flex-col gap-3 text-gray-300 text-sm md:text-base">
                            <p>
                                <span className="font-semibold text-purple-400">Framework:</span>{" "}
                                {framework}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-400">Use Case:</span>{" "}
                                {useCase}
                            </p>
                            <p>
                                <span className="font-semibold text-purple-400">Dataset:</span>{" "}
                                {dataset}
                            </p>
                        </div>

                        <p className="text-gray-200 leading-relaxed text-sm md:text-base">
                            {description}
                        </p>

                        <p className="text-sm text-gray-400">
                            <span className="font-semibold text-purple-300">{purchased}</span>{" "}
                            times purchased
                        </p>

                        {/* Button */}
                        <div className="pt-4">
                            <button className="relative overflow-hidden px-6 py-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg">
                                <span className="absolute inset-0 bg-linear-to-r from-purple-500 to-blue-600 blur-xl opacity-50"></span>
                                <span className="relative flex items-center justify-center gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Purchase Model
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelDetails;