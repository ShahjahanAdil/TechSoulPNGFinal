import React, { useEffect, useState } from "react";
import pngImg from "../../../assets/images/bgPNGFinal.jpg";
import Loader from "../../../components/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LuDownload } from "react-icons/lu";
import axios from "axios";

export default function Downloads() {

    const { userData } = useAuthContext()
    const [downloads, setDownloads] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (userData.userID) {
            fetchDownloads()
        }
    }, [userData, page])

    const fetchDownloads = () => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_HOST}/dashboard/downloads?userID=${userData.userID}&page=${page}`)
            .then(res => {
                const { status, data } = res
                if (status === 200) {
                    setDownloads(data.userDownloads)
                    setTotalPages(Math.ceil(data.totalDownloads / 20))
                }
            })
            .catch(err => {
                console.error('Frontend POST error', err.message)
                window.toastify("Something went wrong", "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const renderPageNumbers = () => {
        const pages = []
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i ? '!bg-[#5ABC84] !text-white' : '!bg-[#e8e8e8] !text-[#666]'}`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            )
        }
        return pages
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className="p-4 md:p-8 bg-white rounded-[20px] h-full shadow">
            <h5 className="flex items-center gap-2 !text-[#55AF7C] font-semibold mb-8"><LuDownload /> My Downloads</h5>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {downloads.map((download, i) => {
                    return (
                        <div
                            key={i}
                            style={download?.downloadType === 'jpg' ? { backgroundColor: 'white' } : { backgroundImage: `url(${pngImg})` }}
                            className="relative group cursor-pointer flex items-center justify-center p-1 h-[120px] sm:h-[140px] md:h-[170px] shadow-md rounded-[12px]"
                            onClick={() => navigate(`/image/${download.imageID}`)}
                        >
                            <img src={`${import.meta.env.VITE_HOST}${download.imageURL}`} alt="image" className="w-full h-full object-contain" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-40 transition-opacity duration-300 rounded-[12px]"></div>

                            <div className="absolute hidden group-hover:flex gap-[120px] top-2 right-2 transition-all opacity-0 group-hover:opacity-100 duration-300">
                                <span className="text-white !text-[12px] bg-[#4eaa76] uppercase rounded-[5px] px-1 py-[2px]">
                                    {download?.downloadType}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Pagination */}
            {
                !loading &&
                (
                    totalPages > 1 &&
                    <div className='flex flex-wrap my-10 items-center justify-center gap-1'>
                        {renderPageNumbers()}
                    </div>
                )
            }
        </div >
    );
}
