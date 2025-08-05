import React, { useEffect, useState } from 'react'
import blurBlobs from '../../assets/images/blur-blobs.svg'
import { IoIosSearch } from "react-icons/io";
import HomeSearchBar from '../HomeSearchBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SearchSection() {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

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
        <div className='relative flex justify-center items-center w-full min-h-[380px] sm:min-h-[420px] px-3'>
            <div className="absolute top-0 right-20 -z-1">
                <img src={blurBlobs} alt="blur-blobs" className='w-[450px] blur-blobs' />
            </div>

            <div className='flex flex-col items-center w-full max-w-[700px]'>
                <h2 className='max-w-[300px] sm:max-w-full !text-[24px] sm:!text-[28px] md:!text-[32px] text-center'>Find free images to tell any story</h2>
                <p className='max-w-[380px] sm:max-w-full sm:!text-[18px] text-center mt-2 mb-6'>Find thousands of free high-quality PNG, JPG and WEBP images</p>

                <HomeSearchBar />

                <div className='flex justify-center flex-wrap gap-2 sm:gap-3 mt-6'>
                    {
                        loading ?
                            <div className='flex justify-center items-center'>
                                <span className='w-8 h-8 border-t-2 border-green-400 rounded-full animate-spin'></span>
                            </div>
                            :
                            categories?.map(cat => {
                                return (
                                    <div key={cat._id} className='px-2 py-1 flex items-center gap-1 bg-[#d4f4ff4b] border border-[#9bc4d236] cursor-pointer rounded-full hover:bg-[#d4f4ffaa] hover:border-[#d4f4ff4b]'
                                        role='button' onClick={() => navigate(`images/${cat.category}`)}
                                    >
                                        <IoIosSearch className='text-[#333] text-[10px] sm:text-[13px]' />
                                        <p className='!text-[10px] sm:!text-[13px]'>{cat.category}</p>
                                    </div>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}