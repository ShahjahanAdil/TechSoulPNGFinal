import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import pngBg from "../../assets/images/bgPNGFinal.jpg";
import crownIcon from "../../assets/images/crown.png";
import { MdOutlineFileDownload } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import dayjs from 'dayjs';
import axios from 'axios';

export default function RecentImages() {

    const { userData, dispatch, isGuest, guestData } = useAuthContext();
    const [images, setImages] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shortDownloadLoading, setShortDownloadLoading] = useState(false);
    const [downloadingImageID, setDownloadingImageID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavourites();
    }, [userData]);

    useEffect(() => {
        fetchImages();
        window.scrollTo(0, 0);
    }, []);

    const fetchFavourites = () => {
        axios.get(`${import.meta.env.VITE_HOST}/frontend/favourites/get?userID=${userData.userID}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setFavourites(data.userFavourites);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    };

    const fetchImages = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/fetch-recent-images`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImages(data.imgs);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleAddToFavourites = ({ imageID, imageURL, favourite, license }) => {
        if (!userData.userID) {
            return window.toastify("Please login to continue", "warning")
        }

        const newFav = {
            userID: userData.userID,
            imageID,
            imageURL,
            favourite,
            license,
        };

        axios.post(`${import.meta.env.VITE_HOST}/frontend/favourites/add`, newFav)
            .then((res) => {
                const { data } = res;

                const wasFav = favourites.some(fav => fav.imageID === imageID);
                if (wasFav) {
                    setFavourites(prev => prev.filter(fav => fav.imageID !== imageID));
                } else {
                    setFavourites(prev => [...prev, { imageID }]);
                }

                window.toastify(data.message, "success");
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            });
    }

    const handleShortDownload = async (img) => {
        try {
            const guestDataKey = "guestData";
            const todayStr = dayjs().format("YYYY-MM-DD");

            const isFreeImage = img.license === "free";
            const isFreeUser = userData?.plan === "free";

            setShortDownloadLoading(true);
            setDownloadingImageID(img.imageID);

            if (isGuest) {
                let updatedGuestData = { ...guestData };

                if (updatedGuestData.lastDownloadDate !== todayStr) {
                    updatedGuestData.dailyDownloadsCount = 0;
                    updatedGuestData.lastDownloadDate = todayStr;
                }

                if (updatedGuestData.dailyDownloadsCount >= 10) {
                    return window.toastify("Guest daily download limit (10) reached. Please login for more.", "error");
                }

                updatedGuestData.dailyDownloadsCount += 1;

                localStorage.setItem(guestDataKey, JSON.stringify(updatedGuestData));
                dispatch({ type: "SET_GUEST", payload: { guestData: updatedGuestData } });

                window.toastify("Image Downloaded!", "success");
            }
            else {
                if (!userData?.userID) {
                    return window.toastify("Please login to continue downloading!", "info");
                }

                if (isFreeUser && !isFreeImage) {
                    return window.toastify("Upgrade to premium to download this image!", "error");
                }

                const res = await axios.post(
                    `${import.meta.env.VITE_HOST}/frontend/image/download/${img.imageID}?imageURL=${encodeURIComponent(img.imageURL)}`,
                    { userID: userData.userID, downloadType: img.type }
                );

                if (res.status !== 200) throw new Error(res.data?.message || "Download failed");

                dispatch({
                    type: "SET_PROFILE",
                    payload: {
                        user: {
                            ...userData,
                            dailyDownloadCount: res.data.dailyDownloadCount,
                        },
                    },
                });

                window.toastify(res.data.message, "success");
            }

            const response = await fetch(`${import.meta.env.VITE_ASURA_SUBDOMAIN}${img.imageURL}`, { mode: "cors" });

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = img.title || "download.png";
            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(blobUrl);
        } catch (err) {
            window.toastify(err.response?.data?.message || "Download failed", "error");
            console.error("Download failed:", err);
        } finally {
            setShortDownloadLoading(false);
            setDownloadingImageID("");
        }
    }

    return (
        <div className='mainContainer min-h-[70vh] pb-16'>
            {
                loading ?
                    <div className='flex justify-center items-center'>
                        <span className='w-10 h-10 border-t-2 border-green-600 rounded-full animate-spin'></span>
                    </div>
                    :
                    images.length > 0 &&
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6 px-2 sm:px-4 pb-10">
                            {
                                images.map((img) => (
                                    <div
                                        key={img.imageID}
                                        className="relative w-full sm:h-[250px] h-[150px] cursor-pointer overflow-hidden rounded-lg shadow-sm group"
                                        style={{
                                            backgroundImage: `url(${pngBg})`,
                                            backgroundSize: "300%",
                                        }}
                                        onClick={() => navigate(`/image/${img.imageID}`)}
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${img.imageURL}`}
                                            alt={img.title}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                        <div className="absolute inset-0 bg-[#0000004f] bg-opacity-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-between px-2 py-2">
                                            <div className="flex w-full justify-between z-10">
                                                <span
                                                    className={`bg-white !text-[10px] font-bold px-1 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                                >
                                                    {img.license === "free" ? (
                                                        "FREE"
                                                    ) : (
                                                        <img
                                                            src={crownIcon}
                                                            alt="crown"
                                                            className="w-[12px] md:w-[20px]"
                                                        />
                                                    )}
                                                </span>
                                                <div className="!flex justify-center items-center gap-2">
                                                    <span
                                                        className={`bg-white ${favourites.some((fav) => fav.imageID === img.imageID) ? "text-red-500" : "text-gray-500"} !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddToFavourites({
                                                                imageID: img.imageID,
                                                                imageURL: img.imageURL,
                                                                favourite: img.favourite,
                                                                license: img.license,
                                                            });
                                                        }}
                                                    >
                                                        <FaHeart className="text-[12px]" />
                                                    </span>
                                                    <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1"
                                                        disabled={shortDownloadLoading}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleShortDownload(img);
                                                        }}
                                                    >
                                                        {
                                                            downloadingImageID === img.imageID ?
                                                                <span className="w-5 h-5 border-t-2 rounded-full border-gray-100 animate-spin"></span>
                                                                :
                                                                <>
                                                                    <MdOutlineFileDownload className="text-[14px]" /> {img.type}
                                                                </>
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="!text-white px-1">{img.title}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                            images.length >= 30 &&
                            <div className='flex justify-center items-center'>
                                <button className='flex gap-2 items-center !text-[#5ABC84] font-semibold transition-all duration-200 hover:gap-3'
                                    onClick={() => navigate("/images")}
                                >
                                    Show more <AiOutlineArrowRight />
                                </button>
                            </div>
                        }
                    </>
            }
        </div>
    )
}