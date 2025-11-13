import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const MyModels = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = use(AuthContext); // get current user from auth context

    useEffect(() => {
        const fetchMyModels = async () => {
            try {
                setLoading(true);
                if (!user?.email) {
                    setError('User not logged in');
                    return;
                }

                const response = await fetch(`http://localhost:3000/my-models?creatorEmail=${user.email}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch models');
                }

                const data = await response.json();
                setModels(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyModels();
    }, [user]);

    if (loading) return <div className="text-center">Loading your models...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My AI Models: {models.length}</h1>

            {models.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-4">You haven't created any models yet.</p>
                    <Link
                        to="/add-model"
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Add Your First Model
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {models.map((model) => (
                        <div key={model._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
                            {/* Model Image */}
                            <div className="h-48 bg-gray-200 overflow-hidden">
                                {model.image ? (
                                    <img
                                        src={model.image}
                                        alt={model.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Model Details */}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {model.name}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium mr-2">Framework:</span>
                                        {model.framework}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium mr-2">Use Case:</span>
                                        {model.useCase}
                                    </div>

                                    <div className="flex items-center text-sm text-gray-600">
                                        <span className="font-medium mr-2">Created by:</span>
                                        {model.createdBy}
                                    </div>
                                </div>

                                {/* View Details Button */}
                                <Link
                                    to={`/modelDetails/${model._id}`}
                                    className="block w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyModels;