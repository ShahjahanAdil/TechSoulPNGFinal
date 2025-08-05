import React, { useEffect, useState } from 'react'
import { LuSend } from "react-icons/lu";
import ButtonLoader from "../../../components/ButtonLoader";
import axios from 'axios'

const initialState = { fullname: "", email: "", subject: "", copyrightURL: "", reportedURL: "", message: "", enteredCode: "" }

const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    for (let i = 0; i < 6; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
}

export default function DMCA() {

    const [state, setState] = useState(initialState)
    const [code, setCode] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setCode(generateCode())
    }, [])

    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))

    const handleSubmit = () => {
        const { fullname, email, subject, copyrightURL, reportedURL, message, enteredCode } = state

        if (!fullname || !email || !subject || !copyrightURL || !reportedURL || !message || !enteredCode) {
            return window.toastify("Please fill all fields!", "warning")
        }

        if (enteredCode !== code) {
            return window.toastify("You entered wrong verification code!", "error")
        }

        const newReportData = {
            ...state, originalCode: code
        }

        setLoading(true)
        axios.post(`${import.meta.env.VITE_HOST}/frontend/dmca/send-mail`, newReportData)
            .then((res) => {
                const { status, data } = res
                if (status === 201) {
                    setState(initialState)
                    window.toastify(data.message, "success")
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message)
                window.toastify("Something went wrong while sending your message. Please try again!", "error")
            })
            .finally(() => {
                setLoading(false)
                setCode(generateCode())
            })
    }

    return (
        <div className='w-full max-w-[1000px] mx-auto min-h-screen px-3 py-16'>
            <h3 className='text-center !text-[#4EAA76]'>DMCA Policy</h3>

            <div className='mt-10'>
                <p className='!text-[#333]'>At FlowerPNG, we respect the intellectual property of each user visiting this website.
                    Our focus is to provide a platform where users can access, search, download, and use PNGs in accordance with Copyright
                    Laws. <span className='!inline font-semibold'>Copyright and Its Relationship With Fair Use</span>
                </p>
                <h6 className='!text-[#4eaa76] mt-6 mb-4'>Copyright and Its Relationship With Fair Use</h6>
                <p className='!text-[#333]'>The images available on FlowerPNG, including PNG pictures, may originate from various sources.
                    Some content is directly provided by users, while other content is collected from the internet.
                </p>
                <p className='!text-[#333] my-4'>In the latter case, we act in good faith to ensure the content either belongs to the
                    public domain or qualifies as fair use under Title 17 of the US Copyright Act.
                </p>
                <p className='!text-[#333]'>FlowerPNG complies with 17 U.S.C. § 512 and the DMCA. We are committed to combating unlawful
                    copyright infringement and will process legitimate takedown requests promptly.
                </p>
                <h6 className='!text-[#4eaa76] my-4'>Guide to Submitting a DMCA Takedown Notice</h6>
                <p className='!text-[#333]'>At FlowerPNG, we respect the intellectual property of each user visiting this website.
                    Our focus is to provide a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                </p>
                <ul className='flex flex-col gap-2 list-disc pl-3 my-4'>
                    <li className='!text-[#333]'>
                        <span className='!text-[#4eaa76] font-semibold'>Authorization:</span>{" "}
                        At FlowerPNG, we respect the intellectual property of each user visiting this website. Our focus is to provide
                        a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                    </li>
                    <li className='!text-[#333]'>
                        <span className='!text-[#4eaa76] font-semibold'>Identification of Copyrighted Work:</span>{" "}
                        At FlowerPNG, we respect the intellectual property of each user visiting this website. Our focus is to provide
                        a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                    </li>
                    <li className='!text-[#333]'>
                        <span className='!text-[#4eaa76] font-semibold'>Good Faith Belief:</span>{" "}
                        At FlowerPNG, we respect the intellectual property of each user visiting this website. Our focus is to provide
                        a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                    </li>
                    <li className='!text-[#333]'>
                        <span className='!text-[#4eaa76] font-semibold'>Accuracy and Perjury Statement:</span>{" "}
                        At FlowerPNG, we respect the intellectual property of each user visiting this website. Our focus is to provide
                        a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                    </li>
                </ul>
                <p className='!text-[#333]'>
                    <span className='!text-[#4eaa76] font-semibold'>Important Note:</span>{" "}
                    Filing a false DMCA takedown notice may result in legal consequences, including damages, costs, and attorney fees.
                    If you are unsure about your claim, consult a lawyer before proceeding.
                </p>
                <p className='!text-[#333] mt-4'>
                    At FlowerPNG, we respect the intellectual property of each user visiting this website. Our focus is to provide
                    a platform where users can access, search, download, and use PNGs in accordance with Copyright Laws.
                </p>
            </div>

            <div className='w-full max-w-[500px] my-10'>
                <div>
                    <label className='font-semibold mb-2'>Your Full Name</label>
                    <input type="text" name="fullname" id="fullname" value={state.fullname} placeholder='Enter your full name' className='w-full mb-4 p-3 rounded-[12px]' onChange={handleChange} />
                </div>
                <div>
                    <label className='font-semibold mb-2'>Your Email</label>
                    <input type="text" name="email" id="email" value={state.email} placeholder='Enter your email' className='w-full mb-4 p-3 rounded-[12px]' onChange={handleChange} />
                </div>
                <div>
                    <label className='font-semibold mb-2'>Subject</label>
                    <input type="text" name="subject" id="subject" value={state.subject} placeholder='e.g., remove an image from flower png' className='w-full mb-4 p-3 rounded-[12px]' onChange={handleChange} />
                </div>
                <div>
                    <label className='font-semibold mb-2'>Your URL of the copyrighted work</label>
                    <input type="text" name="copyrightURL" id="copyrightURL" value={state.copyrightURL} className='w-full mb-4 p-3 rounded-[12px]' onChange={handleChange} />
                </div>
                <div>
                    <label className='font-semibold mb-2'>Reported URL on flowerpng</label>
                    <input type="text" name="reportedURL" id="reportedURL" value={state.reportedURL} className='w-full mb-4 p-3 rounded-[12px]' onChange={handleChange} />
                </div>
                <div>
                    <label className='font-semibold mb-2'>At FlowerPNG, we respect the intellectual property of each user visiting
                        this website. Our focus is to provide a platform where users can access, search, download, and use PNGs
                        in accordance with Copyright Laws.
                    </label>
                    <textarea name="message" id="message" rows={6} value={state.message} className='w-full mb-4 p-3 rounded-[12px] resize-none' onChange={handleChange}></textarea>
                </div>
                <div>
                    <label className='font-semibold mb-2'>Verification Code</label>
                    <div className='flex items-end gap-4'>
                        <input type="text" name="enteredCode" id="enteredCode" value={state.enteredCode} placeholder='Enter verification code' className='flex-1 p-3 rounded-[12px]' onChange={handleChange} />
                        <div className='relative w-full max-w-[150px] p-3 bg-green-100 rounded-[12px]'>
                            <p className='!text-[20px] !text-[#4eaa76] font-semibold text-center'>{code}</p>
                            <div className='absolute inset-0 z-1'></div>
                        </div>
                    </div>
                </div>

                <button className='flex justify-center items-center gap-3 w-full mt-8 bg-[#4eaa76] text-white p-3 rounded-[12px] hover:bg-[#4eaa76]/80'
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {
                        loading ?
                            <>Sending Message <ButtonLoader /></>
                            :
                            <>Send Report <LuSend /></>
                    }
                </button>
            </div>
        </div>
    )
}