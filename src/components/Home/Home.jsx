import React, { Suspense } from 'react';
import FeaturedModels from '../FeaturedModels/FeaturedModels';


const Home = () => {
    const featuredModelsPromise = fetch("http://localhost:3000/featured-models")
    .then(res => res.json())

    return (
        <div>
            <Suspense fallback={<div>Loading featured models...</div>}>
                <FeaturedModels featuredModelsPromise={featuredModelsPromise} />
            </Suspense>
        </div>
    );
};

export default Home;