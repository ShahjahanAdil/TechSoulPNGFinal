import React from 'react'
import { FiUpload } from "react-icons/fi";

export default function BGRemoverUse() {
    return (
        <>
            <div className='w-full max-w-7xl mx-auto px-3 sm:px-5 pt-16 pb-20'>
                <div className='flex flex-col items-center mb-10 md:mb-16'>
                    <p className='!text-[#5abc84] bg-[#e6fff1] font-semibold px-4 py-1 rounded-full mb-2'>How It Works?</p>
                    <h4 className='max-w-[300px] sm:max-w-full text-center'>Remove Backgrounds in 3 Simple Steps</h4>
                    <p className='text-center mt-2'>No technical skills required. Just upload, process, and download.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
                    <div className='flex flex-col justify-center items-center px-4 py-8 min-h-40 bg-[#effff6e9] border-b-4 border-[#5abc84] rounded-2xl'>
                        <h6 className='flex justify-center items-center w-12 h-12 !text-white bg-[#5abc84] rounded-full'>1</h6>
                        <h6 className='text-center mt-4'>Upload Your Image</h6>
                        <p className='text-center mt-3'>Drag and drop or click to upload your image. We support all formats.</p>
                    </div>
                    <div className='flex flex-col justify-center items-center px-4 py-8 min-h-40 bg-[#effff6e9] border-b-4 border-[#5abc84] rounded-2xl'>
                        <h6 className='flex justify-center items-center w-12 h-12 !text-white bg-[#5abc84] rounded-full'>2</h6>
                        <h6 className='text-center mt-4'>AI Processing</h6>
                        <p className='text-center mt-3'>AI automatically detects and removes backgrounds with precision.</p>
                    </div>
                    <div className='flex flex-col justify-center items-center px-4 py-8 min-h-40 bg-[#effff6e9] border-b-4 border-[#5abc84] rounded-2xl'>
                        <h6 className='flex justify-center items-center w-12 h-12 !text-white bg-[#5abc84] rounded-full'>3</h6>
                        <h6 className='text-center mt-4'>Download Result</h6>
                        <p className='text-center mt-3'>Download your image with a transparent background in HD.</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center bg-[#5abc84] px-3 py-20 sm:py-30'>
                <h3 className='!text-white text-center mb-2'>Ready to Remove Backgrounds?</h3>
                <p className='w-full max-w-[600px] text-center !text-gray-100'>Start removing backgrounds from your images today. No signup required for your first image.</p>
                <button className='flex items-center gap-3 text-white bg-[#1da5589c] border border-gray-100 px-4 py-3 sm:px-6 sm:py-4 mt-8 rounded-[12px] hover:bg-[#1da5589c]/50'
                    onClick={() => {
                        const upload = document.getElementById("upload")
                        upload.scrollIntoView({ behavior: 'smooth' })
                    }}
                >
                    <FiUpload /> Upload Your First Image
                </button>
            </div>
        </>
    )
}