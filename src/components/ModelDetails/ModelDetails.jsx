
import { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ModelDetails = () => {
    const model = useLoaderData();
    const { _id: modelId, name, framework, useCase, dataset, description, image, purchased, createdBy } = model;
    console.log(model);
    const [purchasedData, setPurchasedData] = useState([]);
     const [purchaseCount, setPurchaseCount] = useState(purchased || 0);
    const purchaseModalRef = useRef(null);
    const { user } = use(AuthContext)
    useEffect(() => {
        fetch(`http://localhost:3000/models/purchased/${modelId}`)
            .then(res => res.json())
            .then(data => {
                console.log('purchased of the model', data);
                setPurchasedData(data);
            })
    }, [modelId]);
    const handlePurchaseModalOpen = () => {
        purchaseModalRef.current.showModal();

    }
    const handlePurchaseSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const framework = e.target.framework.value;
        const useCase = e.target.useCase.value;
        const createdBy = e.target.createdBy.value;
        const purchasedBy = e.target.purchasedBy.value;
        const image = e.target.image.value;
        console.log(modelId, name, framework, useCase, createdBy, purchasedBy, image);
        const newPurchase = {
            modelId: modelId,
            modelName: name,
            framework: framework,
            useCase: useCase,
            createdBy: createdBy,
            purchasedBy: purchasedBy,
            buyer_image: user?.photoURL,
            image: image
        }
        fetch('http://localhost:3000/purchased', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPurchase)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    purchaseModalRef.current.close();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your have purchased Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newPurchase._id = data.insertedId;
                    setPurchasedData([...purchasedData, newPurchase]);

                    // PATCH to increment purchase count
                    fetch(`http://localhost:3000/models/purchase/${modelId}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            if (result.success) {
                                setPurchaseCount((prev) => prev + 1);
                                
                            }
                        })
                        .catch((err) =>
                            console.error("Error updating purchase count:", err)
                        );
                }
            })

    };
    return (
        <>
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
                                <span className="font-semibold text-purple-300">{purchaseCount}</span>{" "}
                                times purchased
                            </p>

                            {/* Button */}
                            <div className="pt-4">
                                <button onClick={handlePurchaseModalOpen} className="relative overflow-hidden px-6 py-3 rounded-full bg-linear-to-r from-purple-500 to-blue-500 text-white font-semibold transition-all hover:scale-105 hover:shadow-lg">
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
            <div>
                {/* modal */}
                {/* Open the modal using document.getElementById('ID').showModal() method */}

                <dialog
                    ref={purchaseModalRef}
                    className="modal modal-bottom sm:modal-middle"
                >
                    <div className="modal-box bg-base-200/60 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl">
                        <h3 className="text-2xl font-bold text-center text-primary mb-4">
                            Purchase Model
                        </h3>

                        <form
                            method="dialog"
                            className="space-y-4"
                            onSubmit={handlePurchaseSubmit}

                        >
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Model Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    readOnly
                                    placeholder="Enter model name"
                                    className="input input-bordered w-full bg-base-100/50 focus:outline-none focus:border-primary transition-all"

                                />
                            </div>

                            {/* Framework */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Framework
                                </label>
                                <input
                                    type="text"
                                    name="framework"
                                    value={framework}
                                    readOnly
                                    placeholder="Enter framework name"
                                    className="input input-bordered w-full bg-base-100/50 focus:outline-none focus:border-primary transition-all"

                                />
                            </div>

                            {/* Use Case */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Use Case
                                </label>
                                <input
                                    type="text"
                                    name="useCase"
                                    value={useCase}
                                    readOnly
                                    placeholder="Describe the use case"
                                    className="input input-bordered w-full bg-base-100/50 focus:outline-none focus:border-primary transition-all"

                                />
                            </div>

                            {/* Created By (read-only) */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Created By
                                </label>
                                <input
                                    type="email"
                                    name="createdBy"
                                    value={createdBy}
                                    readOnly
                                    className="input input-bordered w-full bg-base-100/30 cursor-not-allowed text-base-content/70"
                                />
                            </div>

                            {/* Purchased By */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Purchased By
                                </label>
                                <input
                                    type="email"
                                    name="purchasedBy"
                                    defaultValue={user?.email}
                                    readOnly
                                    className="input input-bordered w-full bg-base-100/50 focus:outline-none focus:border-primary transition-all"
                                    required
                                />
                            </div>

                            {/* Image URL (read-only) */}
                            <div>
                                <label className="block text-sm font-semibold text-base-content/70 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={image}
                                    readOnly
                                    className="input input-bordered w-full bg-base-100/30 cursor-not-allowed text-base-content/70"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="modal-action flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105"
                                >
                                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Submit
                                    </span>
                                </button>




                            </div>
                        </form>
                        <div className='flex justify-end  '>
                            <button onClick={() => purchaseModalRef.current.close()} className="btn  btn-outline  btn-sm">Close</button>
                        </div>
                    </div>
                </dialog>

            </div>
            <div className='px-20 py-20'>
                {/* purchased for the models */}
                <h3 className='text-3xl'>Purchased of the  model: <span>{purchasedData.length}</span></h3>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL No.
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Purchase</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                purchasedData.map((buy, index) => <tr>
                                    <th> {index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {buy.purchasedBy}
                                    </td>
                                    <td>{buy.
                                        modelName}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }
                            {/* row 2 */}

                            {/* row 3 */}

                            {/* row 4 */}

                        </tbody>
                        {/* foot */}

                    </table>
                </div>
            </div>
        </>
    );
};

export default ModelDetails;