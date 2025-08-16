import React, { useState, useEffect, useRef } from "react";
import './Dcards.css'
import { useLocation, useNavigate } from "react-router-dom";
import crownIcon from "../../assets/images/crown.png";
import { FaHeart, FaRegAddressCard } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { BsCopy, BsInfoCircleFill, BsShare, BsTextareaResize } from "react-icons/bs";
import { HiOutlineDownload } from "react-icons/hi";
import { BsFiletypeAi } from "react-icons/bs";
import pngImg from "../../assets/images/bgPNGFinal.jpg";
import ButtonLoader from "../ButtonLoader";
import { useAuthContext } from "../../contexts/AuthContext";
import dayjs from "dayjs";
import axios from "axios";

// resizeType, setResizeType, resizeVal, setResizeVal,
const Dcards = ({ imageDets, similarImages, dimensions, resizeWidth, resizeHeight, setResizeWidth, setResizeHeight, downloadFormat, setDownloadFormat, withBackground, setWithBackground, handleDownload, downloadLoading, }) => {

    const { userData, dispatch, guestData, isGuest } = useAuthContext()
    const [favourites, setFavourites] = useState([])
    const [shortDownloadLoading, setShortDownloadLoading] = useState(false)
    const [downloadingImageID, setDownloadingImageID] = useState("")
    const [previewSizeKB, setPreviewSizeKB] = useState(null)
    const navigate = useNavigate()

    const { pathname } = useLocation()
    const fullLink = `${import.meta.env.VITE_ASURA_DOMAIN}${pathname}`;
    const [copied, setCopied] = useState(false);

    const containerRef = useRef(null);
    const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
    const [isZooming, setIsZooming] = useState(false)

    useEffect(() => {
        if (userData.userID) {
            fetchFavourites()
        }
    }, [userData])

    useEffect(() => {
        if (downloadFormat === 'webp') {
            generatePreviewSize(downloadFormat, withBackground);
        } else {
            generatePreviewSize(downloadFormat);
        }
    }, [downloadFormat, withBackground]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(fullLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setZoomPosition({ x, y });
    };

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

    const generatePreviewSize = (format, withBg = false) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL}`;

        img.onload = async () => {
            let width = img.naturalWidth;
            let height = img.naturalHeight;

            if (format === 'webp') {
                width = Math.round(width * 0.9);
                height = Math.round(height * 0.9);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            if ((format === 'jpg' || format === 'jpeg') || (format === 'webp' && withBg)) {
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, width, height);
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(blob => {
                if (!blob) return;

                const sizeInKB = (blob.size / 1024).toFixed(2);
                setPreviewSizeKB(sizeInKB);
            }, `image/${format}`, 0.9);
        };

        img.onerror = () => {
            setPreviewSizeKB(null);
        };
    };

    // const handleShortDownload = async (img) => {
    //     try {
    //         if (!userData.userID) {
    //             return window.toastify("Please login to continue downloading!", "info")
    //         }

    //         const isFreeUser = userData.plan === "free";
    //         const isFreeImage = img.license === "free";

    //         if (isFreeUser && !isFreeImage) {
    //             return window.toastify("Upgrade to premium to download this image!", "error");
    //         }

    //         setShortDownloadLoading(true)
    //         setDownloadingImageID(img.imageID)

    //         const res = await axios.post(`${import.meta.env.VITE_HOST}/frontend/image/download/${img.imageID}?imageURL=${img.imageURL}`, {
    //             userID: userData.userID,
    //         });

    //         const { status, data } = res;

    //         if (status === 200) {
    //             window.toastify(data.message, "success");

    //             dispatch({
    //                 type: "SET_PROFILE",
    //                 payload: { user: { ...userData, dailyDownloadCount: data.dailyDownloadCount, } },
    //             });

    //             const response = await fetch(
    //                 `${import.meta.env.VITE_HOST}${img.imageURL}`,
    //                 { mode: "cors" }
    //             );

    //             const blob = await response.blob();
    //             const blobUrl = URL.createObjectURL(blob);

    //             const link = document.createElement("a");
    //             link.href = blobUrl;
    //             link.download = img.title || "download.png";
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();

    //             URL.revokeObjectURL(blobUrl);
    //         }
    //     } catch (err) {
    //         window.toastify(err.response?.data?.message || "Download failed", "error");
    //         console.error("Download failed:", err);
    //     } finally {
    //         setShortDownloadLoading(false)
    //         setDownloadingImageID("")
    //     }
    // };

    const handleShortDownload = async (img) => {
        try {
            const guestDataKey = "guestData";
            const todayStr = dayjs().format("YYYY-MM-DD");

            const isFreeImage = img.license === "free";
            const isFreeUser = userData?.plan === "free";

            setShortDownloadLoading(true);
            setDownloadingImageID(img.imageID);

            if (isGuest) {
                if (isGuest && img.license !== "free") {
                    return window.toastify("Upgrade to premium to download this image.", "error");
                }

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
                    { userID: userData.userID, downloadType: downloadFormat }
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
        <>
            <div className="flex items-center justify-center !px-4 !py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1280px] w-full">
                    {/* Left Column */}
                    <div>
                        <p className="font-bold text-[24px] !text-[#333] !mb-4">
                            {imageDets.title}
                        </p>

                        <div
                            ref={containerRef}
                            className="relative !p-3 sm:!p-5 bg-cover bg-center h-[300px] sm:h-[400px] md:h-[500px] rounded-xl flex flex-col justify-end overflow-hidden"
                            style={{
                                backgroundImage: `url(${pngImg})`,
                                backgroundSize: "220%",
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsZooming(true)}
                            onMouseLeave={() => setIsZooming(false)}
                        >
                            {/* License Tag */}
                            <span className={`absolute top-1 left-1 sm:top-2 sm:left-2 ${imageDets.license === "free"
                                ? "bg-[#4EAA76]"
                                : "bg-transparent"
                                } !text-white !text-xs font-semibold !px-2 !py-1 rounded`}>
                                {imageDets.license === "free" ? (
                                    "FREE"
                                ) : (
                                    <img src={crownIcon} alt="crown" className="w-[20px] md:w-[30px]" />
                                )}
                            </span>

                            {/* Heart Icon */}
                            <span
                                className={`absolute top-1 right-1 sm:top-2 sm:right-3 ${favourites.some((fav) => fav.imageID === imageDets.imageID) ? "text-red-500" : "text-gray-500"} !text-[16px] sm:!text-[20px] cursor-pointer transition-all duration-150 ${favourites.some((fav) => fav.imageID === imageDets.imageID) ? 'hover:text-red-400' : 'hover:text-gray-400'}`}
                                onClick={() =>
                                    handleAddToFavourites({
                                        imageID: imageDets.imageID,
                                        imageURL: imageDets.imageURL,
                                        favourite: imageDets.favourite,
                                        license: imageDets.license,
                                    })
                                }
                            >
                                <FaHeart />
                            </span>

                            {/* Image & Zoom */}
                            <div className="relative w-full h-full flex justify-center pointer-events-none">
                                <img
                                    src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL}`}
                                    alt="PNG"
                                    className="object-contain w-full h-full pointer-events-none"
                                />
                                <div
                                    className="absolute inset-0 z-10"
                                    onContextMenu={(e) => e.preventDefault()}
                                    onDragStart={(e) => e.preventDefault()}
                                    onMouseDown={(e) => e.preventDefault()}
                                ></div>

                                {/* Zoom Lens */}
                                {/* {isZooming && (
                                    <div
                                        className="absolute w-[250px] h-[250px] border border-white rounded-full z-20 pointer-events-none"
                                        style={{
                                            top: `${zoomPosition.y - 130}px`,
                                            left: `${zoomPosition.x - 130}px`,
                                            backgroundImage: `url(${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "320%",
                                            backgroundPosition: `${(zoomPosition.x / containerRef.current.offsetWidth) * 100
                                                }% ${(zoomPosition.y / containerRef.current.offsetHeight) * 100}%`,
                                        }}
                                    ></div>
                                )} */}
                            </div>
                        </div>

                        <figcaption className="text-[14px] !mt-4 text-[#666]">
                            Download {imageDets.description}
                        </figcaption>

                        <div className="flex flex-wrap gap-2 !mt-5">
                            {imageDets?.tags?.slice(0, 15).map((tag, i) => {
                                return (
                                    <p
                                        key={i}
                                        className="!text-[13px] cursor-default bg-gray-200 lowercase text-[#666]  !px-3 !py-1 rounded-[8px]"
                                    >
                                        {tag}
                                    </p>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="bg-white !p-1 sm:!p-6 flex flex-col gap-4 h-full">
                        {/* <p className="text-[#666] !mb-3">
                            This image has copyright license and available for commercial use.{" "}
                            <span className="text-[#4e76aa]">
                                Upgrade to Individual Premium
                            </span>{" "}
                            to get license authorization.
                        </p> */}

                        <div className="flex justify-between items-start gap-5 !mb-4">
                            <div className="flex-1">
                                <h6 className="flex gap-2 items-center font-bold !mb-2">
                                    <BsInfoCircleFill /> Image Details
                                </h6>
                                <p>
                                    <span className="text-[#666] text-[14px]">Dimensions:</span>
                                    <span className="font-bold indent-1 inline-block text-[#333]">
                                        {dimensions.width} x {dimensions.height}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-[#666] text-[14px]">MIME Type:</span>
                                    <span className="uppercase font-bold indent-1 inline-block text-[#333]">
                                        {imageDets.type}
                                    </span>
                                </p>
                                <p>
                                    <span className="text-[#666] text-[14px]">Category :</span>
                                    <span className="capitalize font-bold indent-1 inline-block text-[#333]">
                                        {imageDets.category}
                                    </span>
                                </p>
                            </div>

                            <div className="preview rounded-[8px]"
                                onContextMenu={(e) => e.preventDefault()}
                                onDragStart={(e) => e.preventDefault()}
                                onMouseDown={(e) => e.preventDefault()}
                            >
                                <img
                                    src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL}`}
                                    alt="preview"
                                    className="w-[150px] h-[150px] p-2 object-contain rounded-[8px]"
                                    style={downloadFormat === 'png' ? {
                                        backgroundImage: `url(${pngImg})`,
                                        backgroundSize: "400%",
                                    } : downloadFormat === 'webp' ? {
                                        backgroundImage: `url(${pngImg})`,
                                        backgroundSize: "400%",
                                    } : { backgroundColor: "#fff" }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-2 sm:gap-5 md:gap-0 lg:gap-8 flex-col sm:flex-row md:flex-col lg:flex-row">
                            {/* <div className="flex-1 mb-2 sm:mb-4">
                                <p className="flex gap-2 items-center font-bold !text-[#333]"><BsTextareaResize /> Resize Image</p>

                                <div className="flex mt-2">
                                    {['width', 'height'].map((type, i) => {
                                        return (
                                            <button key={i} className={`flex-1 !py-1 sm:!py-2 capitalize !text-[14px]
                                            ${resizeType === type ? 'bg-[#4EAA76] !text-white' : 'bg-gray-200 !text-[#333]'}
                                            ${type === 'width' ? 'rounded-tl-[8px] rounded-bl-[8px]' : 'rounded-tr-[8px] rounded-br-[8px]'}
                                            `}
                                                onClick={() => setResizeType(type)}
                                            >
                                                {type}
                                            </button>
                                        )
                                    })}
                                </div>

                                <div className="relative mt-4">
                                    <input
                                        type="number" name="resize" id="resize" min="50" value={resizeVal ? resizeVal : ''} placeholder="Min value is 50"
                                        className="w-full !p-2 sm:!p-3 rounded-[8px] !text-[12px]"
                                        onChange={e => setResizeVal(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (['e', 'E', '+', '-'].includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    <button
                                        className="absolute right-0 top-0 h-full px-3 bg-[#4EAA76] !text-white !text-[12px] sm:!text-[14px] rounded-tr-[8px] rounded-br-[8px] hover:bg-[#7EC19B]"
                                        disabled={downloadLoading}
                                        onClick={() => handleDownload(true)}
                                    >
                                        Resize
                                    </button>
                                </div>
                            </div> */}

                            <div className="flex-1 mb-2 sm:mb-4">
                                <p className="flex gap-2 items-center font-bold !text-[#333]">
                                    <BsTextareaResize /> Resize Image
                                </p>

                                <div className="flex gap-2 mt-2">
                                    <input
                                        type="number"
                                        placeholder="Width (px)"
                                        className="w-full !p-2 sm:!p-3 rounded-[8px] !text-[12px]"
                                        value={resizeWidth || ''}
                                        min={50}
                                        onChange={(e) => setResizeWidth(e.target.value)}
                                        onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Height (px)"
                                        className="w-full !p-2 sm:!p-3 rounded-[8px] !text-[12px]"
                                        value={resizeHeight || ''}
                                        min={50}
                                        onChange={(e) => setResizeHeight(e.target.value)}
                                        onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                                    />
                                </div>

                                <button
                                    className="w-full mt-3 bg-[#4EAA76] text-white !text-[12px] sm:!text-[14px] py-2 rounded-[8px] hover:bg-[#7EC19B]"
                                    disabled={downloadLoading}
                                    onClick={() => handleDownload(true)}
                                >
                                    Resize & Download
                                </button>
                            </div>

                            <div className="flex-1">
                                <div className="mb-3">
                                    <p className="flex gap-2 items-center font-bold !text-[#333] mb-2"><BsFiletypeAi /> Select Format</p>
                                    <div className="flex gap-2">
                                        {["png", "jpg", "webp"].map((type) => (
                                            <button
                                                key={type}
                                                className={`flex-1 px-4 !py-1 sm:!py-2 rounded-lg text-sm uppercase ${downloadFormat === type
                                                    ? "bg-[#4EAA76] text-white"
                                                    : "bg-gray-200 text-[#333]"
                                                    }`}
                                                onClick={() => setDownloadFormat(type)}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    {
                                        downloadFormat === 'png' ? (
                                            <>
                                                <p className="!text-[14px]">Without background</p>
                                                <p className="!text-[14px]">Size: {previewSizeKB ? `${previewSizeKB} KB` : 'Calculating...'}</p>
                                            </>
                                        ) : downloadFormat === 'jpg' || downloadFormat === 'jpeg' ? (
                                            <>
                                                <p className="!text-[14px]">With white background</p>
                                                <p className="!text-[14px]">Size: {previewSizeKB ? `${previewSizeKB} KB` : 'Calculating...'}</p>
                                            </>
                                        ) : downloadFormat === 'webp' ? (
                                            <>
                                                <div className="flex gap-1 !text-[14px]">
                                                    <input
                                                        type="radio"
                                                        name="backgroundOption"
                                                        id="withBackground"
                                                        checked={withBackground === true}
                                                        onChange={() => setWithBackground(true)}
                                                    />
                                                    <label htmlFor="withBackground" className="!text-[14px] !text-[#666]">With background</label>
                                                </div>
                                                <div className="flex gap-1 !text-[14px]">
                                                    <input
                                                        type="radio"
                                                        name="backgroundOption"
                                                        id="withoutBackground"
                                                        checked={withBackground === false}
                                                        onChange={() => setWithBackground(false)}
                                                    />
                                                    <label htmlFor="withoutBackground" className="!text-[14px] !text-[#666]">Without background</label>
                                                </div>
                                                <p className="!text-[14px]">Size: {previewSizeKB ? `${previewSizeKB} KB` : 'Calculating...'}</p>
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>

                        <button
                            className="flex items-center gap-3 justify-center !text-[16px] sm:!text-[20px] font-bold bg-[#4EAA76] text-white mt-2 sm:mt-0 !px-1 !py-2 sm:!py-4 rounded-lg w-full hover:bg-[#4eaa76ba] cursor-pointer transition !mb-5"
                            disabled={downloadLoading}
                            onClick={() => handleDownload(false, withBackground)}
                        >
                            <HiOutlineDownload className="!text-[20px] sm:!text-[30px]" />
                            {!downloadLoading ? (
                                imageDets.license === "free" ? (
                                    "Free Download"
                                ) : (
                                    "Download Image"
                                )
                            ) : (
                                <>
                                    Downloading <ButtonLoader />
                                </>
                            )}
                        </button>

                        <div className="bg-[#8ed2ac3b] p-4 rounded-[12px]">
                            <h6 className="flex items-center gap-2 !text-[16px] !text-[#339e61] !font-semibold border-b-2 border-b-[#339e6142] pb-2"><BsShare /> Share</h6>
                            <p className="py-3">Share this flowerpng.com image with your friends.</p>
                            <div className="flex justify-between items-center gap-4 mt-4">
                                {/* <p className="!text-[#339e61]">{import.meta.env.VITE_ASURA_SUBDOMAIN}{pathname}</p>
                                <button className="flex items-center gap-1 !text-[12px] bg-[#4EAA76] !text-white p-2 rounded-[8px]">Copy <BsCopy /></button> */}
                                <p className="!text-[#339e61] break-all">{fullLink}</p>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 !text-[12px] bg-[#4EAA76] !text-white p-2 rounded-[8px]"
                                >
                                    {copied ? "Copied!" : "Copy"} <BsCopy />
                                </button>
                            </div>
                        </div>

                        <div className="border border-[#339e61]/50 p-4 rounded-[12px]">
                            <h6 className="flex items-center gap-2 !text-[16px] !text-[#339e61] !font-semibold border-b border-b-[#339e61]/50 pb-2"><FaRegAddressCard /> Licenses</h6>
                            <p className="pt-3">Non-commercial use, <button className="text-[#4EAA76] hover:underline" onClick={() => navigate("/dmca")}>DMCA Contact Us</button></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-2 py-4 md:px-6 md:py-6 mainContainer">
                <h2 className="text-lg font-semibold mb-4">Similar PNG Images</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {/* Individual Card */}
                    {similarImages?.map((similarImg) => {
                        return (
                            <div
                                key={similarImg.imageID}
                                className="relative w-full aspect-square cursor-pointer overflow-hidden rounded-lg group"
                                style={{
                                    backgroundImage: `url(${pngImg})`,
                                    backgroundSize: "300%",
                                }}
                            >
                                <img
                                    src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${similarImg.imageURL}`}
                                    alt={similarImg.title}
                                    className="object-contain w-full h-full"
                                />

                                <div className="absolute top-0 left-0 w-full inset-0 bg-[#00000085]  opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2"
                                    onClick={() => navigate(`/image/${similarImg.imageID}`)}
                                >
                                    <div className="flex w-full justify-between z-10">
                                        <span
                                            className={`bg-white !text-[10px] font-bold px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                        >
                                            {similarImg.license === "free" ? (
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
                                            <span className={`bg-white ${favourites.some((fav) => fav.imageID === similarImg.imageID) ? "text-red-500" : "text-gray-500"} !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToFavourites({
                                                        imageID: similarImg.imageID,
                                                        imageURL: similarImg.imageURL,
                                                        favourite: similarImg.favourite,
                                                        license: similarImg.license
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
                                                    handleShortDownload(similarImg);
                                                }}
                                            >
                                                {
                                                    downloadingImageID === similarImg.imageID ?
                                                        <span className="w-5 h-5 border-t-2 rounded-full border-gray-100 animate-spin"></span>
                                                        :
                                                        <>
                                                            <MdOutlineFileDownload className="text-[14px]" /> {similarImg.type}
                                                        </>
                                                }
                                            </span>
                                        </div>

                                    </div>

                                    <div className="text-white text-sm text-center mt-auto transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
                                        {similarImg.title}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Dcards;