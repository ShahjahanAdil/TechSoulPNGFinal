import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import crownIcon from "../../assets/images/crown.png";
import { useAuthContext } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import axios from "axios";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const tabs = ["nature", "technology", "clothing", "food"];

const CardsSec = () => {

    const { userData, dispatch, guestData, isGuest } = useAuthContext();
    const [images, setImages] = useState([]);
    const [favourites, setFavourites] = useState([]);
    const [activeTab, setActiveTab] = useState("nature");
    const [shortDownloadLoading, setShortDownloadLoading] = useState(false)
    const [downloadingImageID, setDownloadingImageID] = useState("")
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchImages();
    }, [activeTab]);

    useEffect(() => {
        fetchFavourites();
    }, []);

    const fetchImages = () => {
        setLoading(true);
        axios.get(
                `${import.meta.env.VITE_HOST
                }/frontend/fetch-tab-images?category=${activeTab}`
            )
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

    const fetchFavourites = () => {
        axios.get(
                `${import.meta.env.VITE_HOST}/frontend/favourites/get?userID=${userData.userID
                }`
            )
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setFavourites(data.userFavourites);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
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
            license
        }

        axios.post(`${import.meta.env.VITE_HOST}/frontend/favourites/add`, newFav)
            .then((res) => {
                const { data } = res

                const wasFav = favourites.some(fav => fav.imageID === imageID);
                if (wasFav) {
                    setFavourites(prev => prev.filter(fav => fav.imageID !== imageID));
                } else {
                    setFavourites(prev => [...prev, { imageID }]);
                }

                window.toastify(data.message, "success")
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
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

                const imageExtension = img.imageURL.split('.').pop().toLowerCase();

                const res = await axios.post(
                    `${import.meta.env.VITE_HOST}/frontend/image/download/${img.imageID}?imageURL=${encodeURIComponent(img.imageURL)}`,
                    { userID: userData.userID, downloadType: imageExtension}
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
    };

    return (
        <div className="mainContainer">
            <div className="my-5 px-4">
                {/* Heading and Button */}
                <div className="flex justify-between items-start gap-2 mb-3 sm:mb-4">
                    <h2 className="!text-[20px] sm:!text-[32px] font-bold">
                        Explore popular creative Assets
                    </h2>
                    <button
                        className="hidden sm:flex gap-2 items-center rounded-[12px] font-bold hover:gap-4 transition-all duration-300 text-[#5ABC84]"
                        onClick={() => navigate("/images")}
                    >
                        Explore images <AiOutlineArrowRight />
                    </button>
                </div>

                <div className="flex gap-3">
                    {tabs?.map((cat, i) => {
                        return (
                            <button
                                key={i}
                                className={`capitalize text-[14px] sm:text-[18px] pb-1 rounded-sm transition-all duration-150 ease-in-out cursor-pointer font-bold text-[#333] border-b-[#5ABC84] ${cat === activeTab ? "border-b-4" : "border-none"
                                    }`}
                                onClick={() => setActiveTab(cat)}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-5 sm:mt-8">
                    {images.map((img, index) => (
                        // <ImageCard
                        //     key={img.imageID}
                        //     img={img}
                        //     pngBg={pngBg}
                        //     crownIcon={crownIcon}
                        //     favourites={favourites}
                        //     handleAddToFavourites={handleAddToFavourites}
                        //     shortDownloadLoading={shortDownloadLoading}
                        //     downloadingImageID={downloadingImageID}
                        //     navigate={navigate}
                        //     handleShortDownload={handleShortDownload}
                        // />
                        <div
                            key={img.imageID}
                            className={`relative group cursor-pointer rounded-lg shadow-sm overflow-hidden
                            ${index % 3 !== 0 ? index % 2 !== 0 ? "bg-[#ddf5d7]" : "bg-[#F5E9D7]" : "bg-[#F5F6F5]"}`}
                        >
                            <img
                                src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${img.imageURL}`}
                                alt={img.title}
                                className="w-full h-[150px] sm:h-[200px] object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-[#0000004f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-between px-2 py-2"
                                onClick={() => navigate(`/image/${img.imageID}`)}
                            >
                                <div className="flex w-full justify-between z-10">
                                    <span className="!flex items-center bg-white !text-[10px] font-bold px-1 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
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
                                        <span className={`bg-white ${favourites.some((fav) => fav.imageID === img.imageID) ? "text-red-500" : "text-gray-500"} !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToFavourites({
                                                    imageID: img.imageID,
                                                    imageURL: img.imageURL,
                                                    favourite: img.favourite,
                                                    license: img.license
                                                })
                                            }}
                                        >
                                            <FaHeart className="text-[12px]" />
                                        </span>
                                        <span
                                            className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1"
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
                                <p className="!text-white text-xs px-1">{img.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardsSec;
