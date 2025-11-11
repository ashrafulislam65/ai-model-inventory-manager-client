import React, { use } from 'react';
import Model from '../Model/Model';

const FeaturedModels = ({ featuredModelsPromise }) => {
    const models = use(featuredModelsPromise);
    console.log(models);
    return (
        <div className=' md:15 py-20 lg:px-20'>
            <h2 className='text-center text-5xl pb-20 font-bold'>Featured Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    models.map(model => <Model model={model} key={model._id}></Model>)
                }
            </div>

        </div>
    );
};

export default FeaturedModels;