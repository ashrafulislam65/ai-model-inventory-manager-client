import React, { use } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Swal from 'sweetalert2';

const AddModel = () => {
    const { user } = use(AuthContext);
    const navigate = useNavigate();

    const handleAddModel = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const framework = form.framework.value;
        const useCase = form.useCase.value;
        const dataset = form.dataset.value;
        const description = form.description.value;
        const image = form.image.value;

        const newModel = {
            name,
            framework,
            useCase,
            dataset,
            description,
            image,
            createdBy: user?.email,
            createdAt: new Date(),
            purchased: 0
        };

        // POST request to backend
        fetch("http://localhost:3000/add-model", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newModel),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Model added successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/models");
                }
            })
            .catch((err) => {
                console.error("Error adding model:", err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong while adding the model!",
                });
            });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4 py-10">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-purple-400 mb-8">
                    Add a New AI Model
                </h2>

                <form onSubmit={handleAddModel} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Model Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter model name"
                            className="input input-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            required
                        />
                    </div>

                    {/* Framework */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Framework
                        </label>
                        <input
                            type="text"
                            name="framework"
                            placeholder="Example: TensorFlow, PyTorch"
                            className="input input-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            required
                        />
                    </div>

                    {/* Use Case */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Use Case
                        </label>
                        <input
                            type="text"
                            name="useCase"
                            placeholder="e.g., Image Classification"
                            className="input input-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            required
                        />
                    </div>

                    {/* Dataset */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Dataset
                        </label>
                        <input
                            type="text"
                            name="dataset"
                            placeholder="e.g., CIFAR-10, ImageNet"
                            className="input input-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Short description about the model"
                            className="textarea textarea-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-base-content/70">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            placeholder="Enter model image URL"
                            className="input input-bordered w-full bg-base-100/50 focus:border-purple-500 transition-all"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center pt-4">
                        <button
                            type="submit"
                            className="relative overflow-hidden px-8 py-3 rounded-full font-semibold text-white bg-linear-to-r from-purple-500 to-blue-500 hover:scale-105 transition-transform shadow-lg"
                        >
                            <span className="absolute inset-0 bg-linear-to-r from-purple-600 to-blue-600 blur-lg opacity-40"></span>
                            <span className="relative z-10">Add Model</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddModel;