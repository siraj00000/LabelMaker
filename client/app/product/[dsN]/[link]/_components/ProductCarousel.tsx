'use client'
import { CarouselDetailTypes } from '@/app/types/response.types';
import Image from 'next/image';
import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const ProductCarousel: React.FC<CarouselDetailTypes> = ({ carousel_headings, carousel_images, carousel_text }) => {
    return (
        <section className='w-full mt-[10%]'>
            <Carousel
                responsive={responsive}
                autoPlay
                swipeable
                transitionDuration={3000}
                removeArrowOnDeviceType={['tablet', 'mobile']}
                className='md:w-2/5 w-full mx-auto md:py-28 py-10'
            >
                {carousel_images.map((image, index) => (
                    <div key={index} className="w-full flex flex-col items-center justify-center gap-5 h-96 md:h-auto relative">
                        <Image
                            src={image}
                            alt={`Slide ${index}`}
                            className='w-96 h-96 object-contain'
                            style={{ width: '384px', height: '420px,' }}
                            width={100}
                            height={199}
                            priority
                        />
                        <div className="text-center text-black">
                            <h1 className="text-2xl font-bold mb-4">{carousel_headings[index]}</h1>
                            <p>{carousel_text[index]}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    )
}

export default ProductCarousel
