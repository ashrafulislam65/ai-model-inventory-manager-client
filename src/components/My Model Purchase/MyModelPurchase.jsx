import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router';

const MyModelPurchase = () => {
    const { user } = use(AuthContext);
    const [purchasedModels, setPurchasedModels] = useState([]);
    useEffect(() => {
        if (user?.email) {
            fetch(`https://ai-inventory-model-manager-server.vercel.app/purchased?purchasedBy=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    
                    setPurchasedModels(data);
                })
        }

    }, [user?.email])
    return (
        <div className="min-h-screen bg-base-200 px-4 py-10 flex flex-col items-center transition-colors duration-300">
            <div className="w-full max-w-6xl bg-base-100/40 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
                    My Purchased Models ({purchasedModels.length})
                </h1>

                {/* Empty State */}
                {purchasedModels.length === 0 ? (
                    <p className="text-center text-base-content/70 text-lg">
                        You haven’t purchased any models yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full text-base-content/80">
                            {/* Table Head */}
                            <thead className="bg-linear-to-r from-purple-500/20 to-blue-500/20 text-primary text-sm md:text-base">
                                <tr>
                                    <th>#</th>
                                    <th>Model Info</th>
                                    <th>Framework</th>
                                    <th>Use Case</th>
                                    <th>Created By</th>
                                    <th>Purchased By</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {purchasedModels.map((model, index) => (
                                    <tr
                                        key={model._id}
                                        className="hover:bg-base-300/40 transition-all duration-300"
                                    >
                                        {/* SL No */}
                                        <th>{index + 1}</th>

                                        {/* Image + Name */}
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-14 w-14">
                                                        <img
                                                            src={model.image?model.image: "https://img.daisyui.com/images/profile/demo/3@94.webp"}
                                                            alt={model.name}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-base-content/90">
                                                        {model.name}
                                                    </div>
                                                    <div className="text-sm opacity-70">
                                                        Purchased #{index + 1}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Framework */}
                                        <td>{model.framework}</td>

                                        {/* Use Case */}
                                        <td>{model.useCase}</td>

                                        {/* Created By */}
                                        <td>{model.createdBy}</td>

                                        {/* Purchased By */}
                                        <td>{model.purchasedBy}</td>

                                        {/* View Details */}
                                        <td>
                                            <Link
                                                to={`/modelDetails/${model.modelId}`}
                                                className="btn btn-sm rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white hover:scale-105 transition-transform"
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* Table Footer */}
                            <tfoot>
                                <tr>
                                    <th>#</th>
                                    <th>Model Info</th>
                                    <th>Framework</th>
                                    <th>Use Case</th>
                                    <th>Created By</th>
                                    <th>Purchased By</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyModelPurchase;