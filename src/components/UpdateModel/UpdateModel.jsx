import React, { use, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const UpdateModel = () => {
    const { id } = useParams();
    const { user } = use(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        framework: '',
        useCase: '',
        dataset: '',
        description: '',
        image: ''
    });

    // Fetch model data to pre-fill the form
    useEffect(() => {
        const fetchModel = async () => {
            try {
                const res = await fetch(`https://ai-inventory-model-manager-server.vercel.app/models/${id}`);
                const data = await res.json();

                if (data._id) {
                    setFormData({
                        name: data.name || '',
                        framework: data.framework || '',
                        useCase: data.useCase || '',
                        dataset: data.dataset || '',
                        description: data.description || '',
                        image: data.image || ''
                    });
                } else {
                    Swal.fire('Error!', 'Model not found', 'error');
                    navigate('/models');
                }
            } catch (error) {
                console.error('Error fetching model:', error);
                Swal.fire('Error!', 'Failed to load model data', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchModel();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.framework || !formData.useCase || !formData.dataset || !formData.description) {
            Swal.fire('Error!', 'Please fill in all required fields', 'error');
            return;
        }

        try {
            const res = await fetch(`https://ai-inventory-model-manager-server.vercel.app/update-model/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (result.success) {
                // Show success toast
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Model updated successfully!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    // Redirect to model details page
                    navigate(`/modelDetails/${id}`);
                });
            } else {
                Swal.fire('Error!', result.message || 'Failed to update model', 'error');
            }
        } catch (error) {
            console.error('Error updating model:', error);
            Swal.fire('Error!', 'Failed to update model', 'error');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
                    <h1 className="text-3xl font-bold text-purple-400 text-center mb-8">
                        Edit Model
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Model Name */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Model Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter model name"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Framework */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Framework *
                            </label>
                            <select
                                name="framework"
                                value={formData.framework}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            >
                                <option value="">Select Framework</option>
                                <option value="TensorFlow">TensorFlow</option>
                                <option value="PyTorch">PyTorch</option>
                                <option value="Keras">Keras</option>
                                <option value="Scikit-learn">Scikit-learn</option>
                                <option value="ShuffleNet">ShuffleNet</option>
                                <option value="MobileNet">MobileNet</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Use Case */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Use Case *
                            </label>
                            <input
                                type="text"
                                name="useCase"
                                value={formData.useCase}
                                onChange={handleInputChange}
                                placeholder="Describe the use case"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Dataset */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Dataset *
                            </label>
                            <input
                                type="text"
                                name="dataset"
                                value={formData.dataset}
                                onChange={handleInputChange}
                                placeholder="Enter dataset name"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your model..."
                                rows="4"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                                required
                            />
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-semibold text-purple-300 mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>

                        {/* Image Preview */}
                        {formData.image && (
                            <div>
                                <label className="block text-sm font-semibold text-purple-300 mb-2">
                                    Image Preview
                                </label>
                                <img
                                    src={formData.image}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg border border-gray-700"
                                />
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                type="submit"
                                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Update Model
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate(`/models/${id}`)}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateModel;