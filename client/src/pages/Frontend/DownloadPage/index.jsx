import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Dcards from "../../../components/Dcards";
import Loader from "../../../components/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";
// import Search from "../../../components/Search";
import pica from "pica";
import dayjs from "dayjs";
import axios from "axios";

export default function DownloadPage() {

    const { imageID } = useParams();
    const { userData, dispatch, guestData, isGuest } = useAuthContext()
    const { pathname } = useLocation()

    const [imageDets, setImageDets] = useState({});
    const [similarImages, setSimilarImages] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [resizeType, setResizeType] = useState("width")
    const [resizeVal, setResizeVal] = useState(null)
    const [downloadFormat, setDownloadFormat] = useState("png");
    const [loading, setLoading] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        fetchImage()
    }, [pathname])

    useEffect(() => {
        if (imageDets.imageID) {
            fetchSimilarImages()
        }
    }, [imageDets, pathname])

    useEffect(() => {
        if (!imageDets?.imageURL) return;

        const img = new Image();
        img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`;

        img.onload = () => {
            setDimensions({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        };
    }, [imageDets]);

    const fetchImage = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/image?imageID=${imageID}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImageDets(data.img);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchSimilarImages = () => {
        axios.get(`${import.meta.env.VITE_HOST}/frontend/similar-images?imageCategory=${imageDets?.category}`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setSimilarImages(data.similarImgs);
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
    };

    // const handleDownload = async () => {
    //     try {
    //         if (!userData.userID) {
    //             return window.toastify("Please login to continue downloading!", "info")
    //         }

    //         const isFreeUser = userData.plan === "free";
    //         const isFreeImage = imageDets.license === "free";

    //         if (isFreeUser && !isFreeImage) {
    //             return window.toastify("Upgrade to premium to download this image!", "error");
    //         }

    //         setDownloadLoading(true)
    //         const res = await axios.post(`${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${imageDets.imageURL}`, {
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
    //                 `${import.meta.env.VITE_HOST}${imageDets.imageURL}`,
    //                 { mode: "cors" }
    //             );

    //             const blob = await response.blob();
    //             const blobUrl = URL.createObjectURL(blob);

    //             const link = document.createElement("a");
    //             link.href = blobUrl;
    //             link.download = imageDets.title || "download.png";
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove();

    //             URL.revokeObjectURL(blobUrl);
    //         }
    //     } catch (err) {
    //         window.toastify(err.response?.data?.message || "Download failed", "error");
    //         console.error("Download failed:", err);
    //     } finally {
    //         setDownloadLoading(false)
    //     }
    // };

    // const handleDownload = async () => {
    //     try {
    //         if (!userData?.userID) {
    //             return window.toastify("Please login to continue downloading!", "info");
    //         }

    //         const isFreeUser = userData.plan === "free";
    //          const isPremiumUser = userData.plan === "premium";
    //         const isFreeImage = imageDets.license === "free";

    //         if (isFreeUser && !isFreeImage) {
    //             return window.toastify("Upgrade to premium to download this image!", "error");
    //         }

    //         if (!resizeVal || Number(resizeVal) < 50) {
    //             return window.toastify("Please enter a resize value of 50 or above!", "error");
    //         }

    //         setDownloadLoading(true);

    //         // Call backend to validate download and update counts
    //         const res = await axios.post(
    //             `${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${encodeURIComponent(imageDets.imageURL)}`,
    //             { userID: userData.userID }
    //         );

    //         if (res.status !== 200) {
    //             throw new Error(res.data?.message || "Download not allowed.");
    //         }

    //         window.toastify(res.data.message, "success");

    //         dispatch({
    //             type: "SET_PROFILE",
    //             payload: {
    //                 user: {
    //                     ...userData,
    //                     dailyDownloadCount: res.data.dailyDownloadCount,
    //                 },
    //             },
    //         });

    //         // Load the image
    //         const img = new Image();
    //         img.crossOrigin = "anonymous";
    //         img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`;

    //         img.onload = async () => {
    //             // Calculate new dimensions maintaining aspect ratio
    //             let newWidth, newHeight;
    //             if (resizeType === "width") {
    //                 newWidth = Math.max(Number(resizeVal), 50);
    //                 newHeight = Math.round((img.naturalHeight / img.naturalWidth) * newWidth);
    //             } else {
    //                 newHeight = Math.max(Number(resizeVal), 50);
    //                 newWidth = Math.round((img.naturalWidth / img.naturalHeight) * newHeight);
    //             }

    //             // Create source canvas with original image
    //             const srcCanvas = document.createElement("canvas");
    //             srcCanvas.width = img.naturalWidth;
    //             srcCanvas.height = img.naturalHeight;
    //             const srcCtx = srcCanvas.getContext("2d");
    //             srcCtx.drawImage(img, 0, 0);

    //             // Create destination canvas with new size
    //             const destCanvas = document.createElement("canvas");
    //             destCanvas.width = newWidth;
    //             destCanvas.height = newHeight;

    //             // Use pica to resize with high quality
    //             const picaInstance = pica();

    //             try {
    //                 await picaInstance.resize(srcCanvas, destCanvas, {
    //                     unsharpAmount: 80,
    //                     unsharpRadius: 0.6,
    //                     unsharpThreshold: 2,
    //                 });

    //                 // Determine MIME type
    //                 const type = imageDets.type.toLowerCase();
    //                 let mimeType = "image/png";
    //                 if (type === "jpg" || type === "jpeg") mimeType = "image/jpeg";
    //                 else if (type === "webp") mimeType = "image/webp";

    //                 // Convert canvas to Blob and download
    //                 destCanvas.toBlob((blob) => {
    //                     if (!blob) {
    //                         window.toastify("Failed to generate image blob.", "error");
    //                         setDownloadLoading(false);
    //                         return;
    //                     }
    //                     const blobUrl = URL.createObjectURL(blob);
    //                     const link = document.createElement("a");
    //                     link.href = blobUrl;
    //                     link.download = `${imageDets.title || "download"}.${type}`;
    //                     document.body.appendChild(link);
    //                     link.click();
    //                     link.remove();
    //                     URL.revokeObjectURL(blobUrl);
    //                     setDownloadLoading(false);
    //                 },
    //                     mimeType,
    //                     mimeType === "image/jpeg" || mimeType === "image/webp" ? 0.9 : undefined
    //                 );
    //             } catch (resizeError) {
    //                 window.toastify("Image resizing failed.", "error");
    //                 console.error("Pica resize error:", resizeError);
    //                 setDownloadLoading(false);
    //             }
    //         };

    //         img.onerror = () => {
    //             window.toastify("Failed to load image for resizing.", "error");
    //             setDownloadLoading(false);
    //         };
    //     } catch (err) {
    //         window.toastify(err.response?.data?.message || err.message || "Download failed", "error");
    //         console.error("Download failed:", err);
    //         setDownloadLoading(false);
    //     }
    // };

    const handleDownload = async (isResized = false) => {
        try {
            if (isGuest) {
                const guestDataKey = "guestData"
                const todayStr = dayjs().format("YYYY-MM-DD")

                const updatedGuestData = { ...guestData }

                if (updatedGuestData.lastDownloadDate !== todayStr) {
                    updatedGuestData.dailyDownloadsCount = 0
                    updatedGuestData.lastDownloadDate = todayStr
                }

                if (updatedGuestData.dailyDownloadsCount >= 10) {
                    return window.toastify("Guest daily download limit (10) reached. Please login for more.", "error")
                }

                updatedGuestData.dailyDownloadsCount += 1

                localStorage.setItem(guestDataKey, JSON.stringify(updatedGuestData))
                dispatch({ type: "SET_GUEST", payload: { guestData: updatedGuestData } })

                window.toastify("Image Downloaded!", "success")
            } else {
                if (userData.plan === "free" && imageDets.license !== "free") {
                    return window.toastify("Upgrade to premium to download this image.", "error")
                }

                setDownloadLoading(true)

                const res = await axios.post(
                    `${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${encodeURIComponent(imageDets.imageURL)}`,
                    { userID: userData.userID }
                )

                if (res.status !== 200) throw new Error(res.data?.message || "Download failed")

                dispatch({
                    type: "SET_PROFILE",
                    payload: {
                        user: {
                            ...userData,
                            dailyDownloadCount: res.data.dailyDownloadCount,
                        },
                    },
                })

                window.toastify(res.data.message, "success")
            }

            if (isResized && (!resizeVal || Number(resizeVal) < 50)) {
                return window.toastify("Enter a resize value of 50 or above.", "error")
            }

            const img = new Image()
            img.crossOrigin = "anonymous"
            img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`

            img.onload = async () => {
                let width = img.naturalWidth
                let height = img.naturalHeight

                if (isResized) {
                    if (resizeType === "width") {
                        width = Number(resizeVal)
                        height = Math.round((img.naturalHeight / img.naturalWidth) * width)
                    } else {
                        height = Number(resizeVal)
                        width = Math.round((img.naturalWidth / img.naturalHeight) * height)
                    }
                }

                const srcCanvas = document.createElement("canvas")
                srcCanvas.width = img.naturalWidth
                srcCanvas.height = img.naturalHeight
                srcCanvas.getContext("2d").drawImage(img, 0, 0)

                if (isResized) {
                    const destCanvas = document.createElement("canvas")
                    destCanvas.width = width
                    destCanvas.height = height

                    const picaInstance = pica()
                    await picaInstance.resize(srcCanvas, destCanvas)

                    destCanvas.toBlob(blob => {
                        if (!blob) {
                            window.toastify("Failed to generate image.", "error")
                            return
                        }
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = `${imageDets.title || "download"}.${downloadFormat}`
                        // link.download = `${imageDets.title || "download"}.${imageDets.type}`
                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        URL.revokeObjectURL(url)
                        setDownloadLoading(false)
                    }, `image/${downloadFormat}`, 0.9)
                    // }, `image/${imageDets.type}`, 0.9)
                } else {
                    srcCanvas.toBlob(blob => {
                        if (!blob) {
                            window.toastify("Failed to generate image.", "error")
                            return
                        }
                        const url = URL.createObjectURL(blob)
                        const link = document.createElement("a")
                        link.href = url
                        link.download = `${imageDets.title || "download"}.${downloadFormat}`
                        // link.download = `${imageDets.title || "download"}.${imageDets.type}`
                        document.body.appendChild(link)
                        link.click()
                        link.remove()
                        URL.revokeObjectURL(url)
                        setDownloadLoading(false)
                    }, `image/${downloadFormat}`, 0.9)
                    // }, `image/${imageDets.type}`, 0.9)
                }
            }

            img.onerror = () => {
                window.toastify("Failed to load image.", "error")
                setDownloadLoading(false)
            }
        } catch (err) {
            window.toastify(err.response?.data?.message || err.message || "Download failed", "error")
            setDownloadLoading(false)
        }
    }

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {/* <Search /> */}
            <Dcards
                imageDets={imageDets} setImageDets={setImageDets} similarImages={similarImages} setSimilarImages={setSimilarImages} dimensions={dimensions} resizeType={resizeType} setResizeType={setResizeType} resizeVal={resizeVal} setResizeVal={setResizeVal} downloadFormat={downloadFormat} setDownloadFormat={setDownloadFormat} handleDownload={handleDownload} downloadLoading={downloadLoading} />
        </>
    );
}