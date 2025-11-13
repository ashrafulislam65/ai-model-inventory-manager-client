import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllModels = () => {
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFramework, setSelectedFramework] = useState('all');
    const [frameworks, setFrameworks] = useState([]);

    // Fetch all models and extract unique frameworks
    useEffect(() => {
        const fetchModels = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/models");
                const data = await response.json();

                setModels(data);
                setFilteredModels(data);

                // Extract unique frameworks
                const uniqueFrameworks = [...new Set(data.map(model => model.framework))].filter(Boolean);
                setFrameworks(uniqueFrameworks);

            } catch (err) {
                console.error("Error fetching models:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchModels();
    }, []);

    // Combined search and filter function
    const handleSearchAndFilter = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams();
            if (searchTerm.trim()) {
                params.append('search', searchTerm.trim());
            }
            if (selectedFramework !== 'all') {
                params.append('framework', selectedFramework);
            }

            const url = `http://localhost:3000/models/combined?${params.toString()}`;
            const response = await fetch(url);
            const data = await response.json();

            setFilteredModels(data);

        } catch (error) {
            console.error("Error in search/filter:", error);
            // Fallback to client-side filtering if API fails
            filterModelsClientSide();
        } finally {
            setLoading(false);
        }
    };

    // Client-side fallback filtering
    const filterModelsClientSide = () => {
        let filtered = models;

        // Apply search filter
        if (searchTerm.trim()) {
            filtered = filtered.filter(model =>
                model.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply framework filter
        if (selectedFramework !== 'all') {
            filtered = filtered.filter(model =>
                model.framework === selectedFramework
            );
        }

        setFilteredModels(filtered);
    };

    // Handle search input change with debounce
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.trim() || selectedFramework !== 'all') {
                handleSearchAndFilter();
            } else {
                // If no filters, show all models
                setFilteredModels(models);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedFramework, models]);

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedFramework('all');
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black py-10 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-purple-400 mb-4">
                        All AI Models
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Discover and explore our collection of AI models
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/10">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search Bar */}
                        <div className="flex-1 w-full lg:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search models by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <div className="absolute right-3 top-3">
                                    🔍
                                </div>
                            </div>
                        </div>

                        {/* Framework Filter */}
                        <div className="w-full lg:w-64">
                            <select
                                value={selectedFramework}
                                onChange={(e) => setSelectedFramework(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="all">All Frameworks</option>
                                {frameworks.map((framework) => (
                                    <option key={framework} value={framework}>
                                        {framework}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchTerm || selectedFramework !== 'all') && (
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-red-500/20 text-red-300 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-colors"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Active Filters Display */}
                    {(searchTerm || selectedFramework !== 'all') && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {searchTerm && (
                                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                                    Search: "{searchTerm}"
                                </span>
                            )}
                            {selectedFramework !== 'all' && (
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                                    Framework: {selectedFramework}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-400">
                        Showing {filteredModels.length} of {models.length} models
                        {(searchTerm || selectedFramework !== 'all') && ' (filtered)'}
                    </p>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                )}

                {/* Models Grid */}
                {!loading && (
                    <>
                        {filteredModels.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                                    No models found
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    {searchTerm || selectedFramework !== 'all'
                                        ? 'Try adjusting your search or filter criteria'
                                        : 'No AI models available at the moment'
                                    }
                                </p>
                                {(searchTerm || selectedFramework !== 'all') && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                                    >
                                        Show All Models
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredModels.map((model) => (
                                    <div
                                        key={model._id}
                                        className="card bg-white/10 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 group"
                                    >
                                        {/* Model Image */}
                                        <figure className="relative overflow-hidden">
                                            <img
                                                src={model.image || "https://via.placeholder.com/400x250?text=No+Image"}
                                                alt={model.name}
                                                className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-purple-500/80 text-white text-sm rounded-full backdrop-blur-sm">
                                                    {model.framework}
                                                </span>
                                            </div>
                                        </figure>

                                        {/* Card Body */}
                                        <div className="card-body p-5">
                                            <h2 className="card-title text-xl font-semibold text-white mb-2">
                                                {model.name}
                                            </h2>

                                            {model.description && (
                                                <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                                                    {model.description}
                                                </p>
                                            )}

                                            <div className="space-y-2 mb-4">
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
                                                {model.createdBy && (
                                                    <p className="text-sm text-gray-300">
                                                        <span className="font-semibold text-purple-400">
                                                            Created by:
                                                        </span>{" "}
                                                        {model.createdBy}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="card-actions justify-between items-center mt-4">
                                                <Link
                                                    to={`/modelDetails/${model._id}`}
                                                    className="btn btn-sm rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white hover:scale-105 transition-transform flex-1"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllModels;