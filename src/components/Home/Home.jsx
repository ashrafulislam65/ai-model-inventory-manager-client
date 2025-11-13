import React, { Suspense } from 'react';
import FeaturedModels from '../FeaturedModels/FeaturedModels';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import AboutAiModel from '../AboutAiModel/AboutAiModel';
import GetStarted from '../GetStarted/GetStarted';



const Home = () => {
    const featuredModelsPromise = fetch("http://localhost:3000/featured-models")
        .then(res => res.json())

    return (
        <div className=''>
            <div className='lg:px-20  lg:my-30   '>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper "
                >
                    <SwiperSlide><img src='https://i.ibb.co.com/tPkBms9r/Chat-GPT-Image-Nov-13-2025-04-57-32-PM.png' alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.ibb.co.com/NdbTbfX3/Chat-GPT-Image-Nov-13-2025-05-08-02-PM.png" alt="" /></SwiperSlide>
                    <SwiperSlide><img src="https://i.ibb.co.com/NdbTbfX3/Chat-GPT-Image-Nov-13-2025-05-08-02-PM.png" alt="" /></SwiperSlide>

                </Swiper>
            </div>
            <Suspense fallback={<div>Loading featured models...</div>}>
                <FeaturedModels featuredModelsPromise={featuredModelsPromise} />

            </Suspense>
            <AboutAiModel></AboutAiModel>
            <GetStarted></GetStarted>
        </div>
    );
};

export default Home;