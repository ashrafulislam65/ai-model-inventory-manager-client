import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllModels = () => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/models")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setModels(data);
            })
            .catch((err) => console.error("Error fetching models:", err));
    }, []);
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-10 px-6 flex flex-col items-center">
            <div className="max-w-7xl w-full">
                <h1 className="text-4xl font-bold text-center text-purple-400 mb-10">
                    All AI Models
                </h1>

                {models.length === 0 ? (
                    <p className="text-center text-gray-400">No models found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {models.map((model) => (
                            <div
                                key={model._id}
                                className="card bg-white/10 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                            >
                                {/* Model Image */}
                                <figure className="relative">
                                    <img
                                        src={model.image || "https://via.placeholder.com/400x250?text=No+Image"}
                                        alt={model.name}
                                        className="h-56 w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                                </figure>

                                {/* Card Body */}
                                <div className="card-body p-5">
                                    <h2 className="card-title text-xl font-semibold text-white">
                                        {model.name}
                                    </h2>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-purple-400">
                                            Framework:
                                        </span>{" "}
                                        {model.framework}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                        <span className="font-semibold text-purple-400">
                                            Use Case:
                                        </span>{" "}
                                        {model.useCase}
                                    </p>

                                    <div className="mt-5 flex justify-between items-center">
                                        <Link
                                            to={`/modelDetails/${model._id}`}
                                            className="btn btn-sm rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white hover:scale-105 transition-transform"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllModels;