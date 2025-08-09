import React, { useState, useEffect } from 'react';
import test1 from '../../assets/images/test 1.png';
import test2 from '../../assets/images/test 2.png';
import test3 from '../../assets/images/test 3.png';
import { TiStarFullOutline } from "react-icons/ti";

const testimonials = [
    {
        image: test1,
        name: "Asikur Rahman",
        role: "Intermediate Designer",
        title: "I recommend FlowerPNG to get free quality PNGs",
        description: "FlowerPNG is a PNG stock images market but also you can find lot of interesting Templates and Backgrounds. I have been using the site for more than 3 years now. The staff are nice and reply in time. The Graphics are good enough and you can almost find anything you looking for. That said, I recommend FlowerPNG For Anyone who's looking for Stock Graphics especially with transparent background. They know what they are doing and it's even FREE to preview and USE PNG."
    },
    {
        image: test3,
        name: "Jessica Williams",
        role: "Graphic Design Student",
        title: "A lifesaver for my design projects",
        description: "As a design student, FlowerPNG has been invaluable for my projects. The quality of the transparent PNGs is consistently high, and I love how easy it is to find exactly what I need. The free downloads with attribution have helped me complete assignments without breaking my limited budget. The seasonal collections are particularly impressive - I used their holiday-themed elements for my last project and got top marks!"
    },
    {
        image: test2,
        name: "Michael Chen",
        role: "Freelance Web Developer",
        title: "My go-to resource for web graphics",
        description: "I've tried many stock image sites, but FlowerPNG stands out for web development work. The PNGs have perfect transparency and load quickly. Their AI background remover saves me hours of work. What really impressed me was when I needed a specific tropical flower graphic - not only did they have it, but their support team helped me find alternative versions when the first one wasn't quite right. That level of service keeps me coming back."
    }
];

const Testimonials = () => {

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [transitioning, setTransitioning] = useState(false);

    const handleTestimonialChange = (index) => {
        if (index === selectedIndex || transitioning) return;

        setTransitioning(true);
        setTimeout(() => {
            setSelectedIndex(index);
            setTransitioning(false);
        }, 200);
    };

    return (
        <div className="bg-green-50 px-8 py-12 mt-8">
            <h2 className="!text-[20px] sm:!text-[32px] font-bold text-center mb-8">
                Find out why FlowerPNG is trusted by users
            </h2>

            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12 mt-4 sm:mt-8">
                <div className="flex flex-col gap-6 w-full lg:w-1/2">
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className={`hover:bg-white rounded-xl hover:shadow cursor-pointer p-2 transition-all duration-200 ease-linear flex items-center gap-4 ${selectedIndex === i && 'bg-white shadow'}`}
                            onClick={() => handleTestimonialChange(i)}
                        >
                            <div className="img">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="w-16 h-16 rounded-full transition-opacity duration-300"
                                />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{t.name}</h4>
                                <p className="text-sm text-gray-600">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full lg:w-1/2 mt-3 relative min-h-[350px]">
                    <div className={`absolute inset-0 transition-opacity duration-200 ${transitioning ? 'opacity-0' : 'opacity-100'
                        }`}>
                        <blockquote className="!text-[20px] sm:!text-[32px] font-semibold mb-2">
                            "{testimonials[selectedIndex].title}"
                        </blockquote>
                        <p className="text-gray-700 text-sm mb-4">
                            {testimonials[selectedIndex].description}
                        </p>
                        <div className="flex gap-1 text-yellow-400 text-xl">
                            {[...Array(5)].map((_, i) => (
                                <TiStarFullOutline key={i} className='bg-[#FFEECC] p-1 rounded-[5px]' />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;