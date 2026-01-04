import React from 'react';
import { Link } from 'react-router';

const Model = ({ model }) => {
    const { _id,name, framework, image, description } = model;
    return (
        <div className=''>
            <div className="card h-[400px] bg-base-200/40 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-300 rounded-xl overflow-hidden">


                <figure className="w-full aspect-4/3 overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover object-center"
                    />
                </figure>


                <div className="card-body text-center space-y-2">
                    <h2 className="card-title text-base-content">{name}</h2>
                    <p className="text-sm opacity-80">{framework}</p>
                    <p className="text-sm opacity-70">{description?.slice(0, 80)}...</p>

                    <Link to={`/modelDetails/${_id}`}>
                        <button className="relative overflow-hidden px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 mx-auto flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-linear-to-r from-purple-500 to-blue-500 blur-xl opacity-60"></span>
                            <span className="relative flex items-center justify-center gap-2">
                                View Details
                            </span>
                        </button>

                    </Link>

                </div>
            </div>


        </div>
    );
};

export default Model;