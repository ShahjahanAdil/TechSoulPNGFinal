import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import './CardSlider.css';

import image1 from "../../assets/images/img-1.jpg";
import image2 from "../../assets/images/img-2.jpg";
import image3 from "../../assets/images/img-3.jpg";
import image4 from "../../assets/images/travel.jpg";
import image5 from "../../assets/images/fathers-day.jpg";
import image6 from "../../assets/images/bg4.jpg";

const images = [
    { id: 1, src: image1, alt: "Mountain landscape with clear sky" },
    { id: 2, src: image2, alt: "Couple in car reading a map" },
    { id: 3, src: image3, alt: "Technology and circuit board close-up" },
    { id: 4, src: image4, alt: "Travel destination" },
    { id: 5, src: image5, alt: "Father’s Day celebration" },
    { id: 6, src: image6, alt: "Creative background" },
];

const CardsSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
    const [direction, setDirection] = useState('right'); // 'left' or 'right'

    const goToPrevious = () => {
        if (transitioning) return;
        setTransitioning(true);
        setDirection('left');
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            setTransitioning(false);
        }, 500); // Match this with CSS transition duration
    };

    const goToNext = () => {
        if (transitioning) return;
        setTransitioning(true);
        setDirection('right');
        setTimeout(() => {
            setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            setTransitioning(false);
        }, 500); // Match this with CSS transition duration
    };

    const getPreviousIndex = () => 
        currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    const getNextIndex = () => 
        currentIndex === images.length - 1 ? 0 : currentIndex + 1;

    return (
        <div className="mainContainer w-full bg-white">
            <h2 className="!text-[20px] sm:!text-[32px] font-bold px-4 pt-6 pb-4">
                Top Free Pics This Week
            </h2>

            <div className="slider-container relative w-full overflow-hidden px-4">
                <div className="flex items-center justify-center relative h-[20rem] md:h-[28rem] lg:h-[32rem]">
                    {/* Left Navigation */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition-all hover:scale-110 group"
                    >
                        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                    </button>

                    {/* Left Preview Image */}
                    <div
                        className="side-image left-image hidden md:block w-1/4 h-full relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={goToPrevious}
                    >
                        <img
                            src={images[getPreviousIndex()].src}
                            alt={images[getPreviousIndex()].alt}
                            className={`side-img ${transitioning ? 'fade-out' : 'fade-in'}`}
                        />
                        <div className="side-overlay left-overlay" />
                    </div>

                    {/* Center Image */}
                    <div className="center-image w-full md:w-2/4 h-full mx-2 relative rounded-xl overflow-hidden shadow-2xl aspect-[16/9]">
                        <img
                            src={images[currentIndex].src}
                            alt={images[currentIndex].alt}
                            className={`main-img ${transitioning ? `slide-${direction}` : ''}`}
                        />
                        <div className="image-overlay" />
                    </div>

                    {/* Right Preview Image */}
                    <div
                        className="side-image right-image hidden md:block w-1/4 h-full relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={goToNext}
                    >
                        <img
                            src={images[getNextIndex()].src}
                            alt={images[getNextIndex()].alt}
                            className={`side-img ${transitioning ? 'fade-out' : 'fade-in'}`}
                        />
                        <div className="side-overlay right-overlay" />
                    </div>

                    {/* Right Navigation */}
                    <button
                        onClick={goToNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition hover:scale-110 group"
                    >
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardsSlider;