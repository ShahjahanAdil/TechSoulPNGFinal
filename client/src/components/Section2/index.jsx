import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import axios from "axios";

export default function Section2() {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/frontend/home/fetch-categories`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setCategories(data.cats)
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <>
            <div className="mainContainer">
                <div className="flex justify-between items-start mt-5">
                    <h3 className="px-4 !text-[20px] sm:!text-[32px] font-bold md:mb-3">
                        Featured images and collections
                    </h3>

                    <button
                        className="hidden sm:flex gap-2 items-center rounded-[12px] font-bold px-[20px] hover:gap-4 transition-all duration-300 !text-[#5ABC84]"
                        onClick={() => navigate("/images")}
                    >
                        Explore images <AiOutlineArrowRight />
                    </button>
                </div>

                <p className="text-gray-500 ps-5 sm:text-[13px]">
                    These popular image collections are perfect for sharing and designing.
                </p>
                <section className="py-10 px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
                        {
                            loading ?
                                <div className='flex justify-center items-center'>
                                    <span className='w-8 h-8 border-t-2 border-green-400 rounded-full animate-spin'></span>
                                </div>
                                :
                                categories.map((cat, index) => (
                                    <div
                                        key={index}
                                        className={`p-3 rounded-xl cursor-pointer shadow-sm transition-all duration-200 ease-linear hover:-translate-y-1 hover:shadow-lg ${index % 3 === 0 ? "bg-[#e5f9e5c4]" : index % 3 === 1 ? "bg-[#f0f8ff]" : "bg-[#fff7ec]"}`}
                                        onClick={() => navigate(`/images/${cat.category}`)}
                                    >
                                        <div>
                                            <img
                                                src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${cat.imageURL}`}
                                                alt={cat.category}
                                                className="w-full h-[100px] sm:h-44 object-contain"
                                            />
                                        </div>
                                        <div>
                                            <p className={`!text-[12px] sm:!text-[16px] font-bold capitalize ${index % 3 === 0 ? "!text-[#64c764]" : index % 3 === 1 ? "!text-[#6497cb]" : "!text-[#d8b378]"}`}>
                                                {cat.category}
                                            </p>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </section >
            </div >
        </>
    );
}