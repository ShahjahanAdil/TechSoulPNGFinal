import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Dcards from "../../../components/Dcards";
import Loader from "../../../components/Loader";
import { useAuthContext } from "../../../contexts/AuthContext";
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
    const [resizeWidth, setResizeWidth] = useState(null);
    const [resizeHeight, setResizeHeight] = useState(null);
    // const [resizeVal, setResizeVal] = useState(null)
    const [downloadFormat, setDownloadFormat] = useState("");
    const [withBackground, setWithBackground] = useState(true);
    const [loading, setLoading] = useState(true);
    const [downloadLoading, setDownloadLoading] = useState(false);

    useEffect(() => {
        fetchImage()
    }, [pathname])

    useEffect(() => {
        if (imageDets.imageID) {
            fetchSimilarImages()
            setDownloadFormat(imageDets.type === 'jpeg' ? 'jpg' : imageDets.type)
        }
    }, [imageDets, pathname])

    useEffect(() => {
        if (!imageDets?.imageURL) return;

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = `${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL}`;

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
                console.error("Frontend GET error", err.message);
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
                console.error("Frontend GET error", err.message);
            })
    };

    // const handleDownload = async (isResized = false, webpWithBackground = false) => {
    //     if (isResized && (!resizeVal || Number(resizeVal) < 50)) {
    //         return window.toastify("Enter a resize value of 50 or above.", "warning");
    //     }

    //     try {
    //         if (isGuest) {
    //             const guestDataKey = "guestData";
    //             const todayStr = dayjs().format("YYYY-MM-DD");

    //             const updatedGuestData = { ...guestData };

    //             if (updatedGuestData.lastDownloadDate !== todayStr) {
    //                 updatedGuestData.dailyDownloadsCount = 0;
    //                 updatedGuestData.lastDownloadDate = todayStr;
    //             }

    //             if (updatedGuestData.dailyDownloadsCount >= 10) {
    //                 return window.toastify("Guest daily download limit (10) reached. Please login for more.", "error");
    //             }

    //             updatedGuestData.dailyDownloadsCount += 1;

    //             localStorage.setItem(guestDataKey, JSON.stringify(updatedGuestData));
    //             dispatch({ type: "SET_GUEST", payload: { guestData: updatedGuestData } });

    //             window.toastify("Image Downloaded!", "success");
    //         } else {
    //             if (userData.plan === "free" && imageDets.license !== "free") {
    //                 return window.toastify("Upgrade to premium to download this image.", "error");
    //             }

    //             setDownloadLoading(true);

    //             const res = await axios.post(
    //                 `${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${encodeURIComponent(imageDets.imageURL)}`,
    //                 { userID: userData.userID }
    //             );

    //             if (res.status !== 200) throw new Error(res.data?.message || "Download failed");

    //             dispatch({
    //                 type: "SET_PROFILE",
    //                 payload: {
    //                     user: {
    //                         ...userData,
    //                         dailyDownloadCount: res.data.dailyDownloadCount,
    //                     },
    //                 },
    //             });

    //             window.toastify(res.data.message, "success");
    //         }

    //         const img = new Image();
    //         img.crossOrigin = "anonymous";
    //         img.src = `${import.meta.env.VITE_HOST}${imageDets.imageURL}`;

    //         img.onload = async () => {
    //             let width = img.naturalWidth;
    //             let height = img.naturalHeight;

    //             if (downloadFormat === "webp") {
    //                 width = Math.round(width * 0.9);
    //                 height = Math.round(height * 0.9);
    //             }

    //             if (isResized) {
    //                 if (resizeType === "width") {
    //                     width = Number(resizeVal);
    //                     height = Math.round((img.naturalHeight / img.naturalWidth) * width);
    //                 } else {
    //                     height = Number(resizeVal);
    //                     width = Math.round((img.naturalWidth / img.naturalHeight) * height);
    //                 }
    //             }

    //             const canvas = document.createElement("canvas");
    //             canvas.width = width;
    //             canvas.height = height;

    //             const picaInstance = pica();
    //             const tempCanvas = document.createElement("canvas");
    //             tempCanvas.width = img.naturalWidth;
    //             tempCanvas.height = img.naturalHeight;
    //             const tempCtx = tempCanvas.getContext("2d");

    //             if (downloadFormat === "jpg" || downloadFormat === "jpeg" || (downloadFormat === "webp" && webpWithBackground)) {
    //                 tempCtx.fillStyle = "#ffffff";
    //                 tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    //             }

    //             tempCtx.drawImage(img, 0, 0);

    //             await picaInstance.resize(tempCanvas, canvas);

    //             canvas.toBlob(blob => {
    //                 if (!blob) {
    //                     return window.toastify("Failed to generate image.", "error");
    //                 }
    //                 const url = URL.createObjectURL(blob);
    //                 const link = document.createElement("a");
    //                 link.href = url;
    //                 link.download = `${imageDets.title || "download"}.${downloadFormat}`;
    //                 document.body.appendChild(link);
    //                 link.click();
    //                 link.remove();
    //                 URL.revokeObjectURL(url);
    //                 setDownloadLoading(false);
    //             }, `image/${downloadFormat}`, 0.9);
    //         };

    //         img.onerror = () => {
    //             window.toastify("Failed to load image.", "error");
    //             setDownloadLoading(false);
    //         };
    //     } catch (err) {
    //         window.toastify(err.response?.data?.message || err.message || "Download failed", "error");
    //         setDownloadLoading(false);
    //     }
    // };

    const handleDownload = async (isResized = false, webpWithBackground = false) => {
        if (
            isResized &&
            (!resizeWidth && !resizeHeight ||
                (resizeWidth && Number(resizeWidth) < 50) ||
                (resizeHeight && Number(resizeHeight) < 50))
        ) {
            return window.toastify("Enter width or height of 50 or above.", "warning");
        }

        try {
            if (isGuest) {
                const guestDataKey = "guestData";
                const todayStr = dayjs().format("YYYY-MM-DD");

                const updatedGuestData = { ...guestData };

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
            } else {
                if (userData.plan === "free" && imageDets.license !== "free") {
                    return window.toastify("Upgrade to premium to download this image.", "error");
                }

                setDownloadLoading(true);

                const res = await axios.post(
                    `${import.meta.env.VITE_HOST}/frontend/image/download/${imageID}?imageURL=${encodeURIComponent(imageDets.imageURL)}`,
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

            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = `${import.meta.env.VITE_ASURA_SUBDOMAIN}${imageDets.imageURL}`;

            img.onload = async () => {
                let width = img.naturalWidth;
                let height = img.naturalHeight;

                if (downloadFormat === "webp") {
                    width = Math.round(width * 0.9);
                    height = Math.round(height * 0.9);
                }

                if (isResized) {
                    const w = Number(resizeWidth);
                    const h = Number(resizeHeight);

                    if (w && h) {
                        width = w;
                        height = h;
                    } else if (w) {
                        width = w;
                        height = Math.round((img.naturalHeight / img.naturalWidth) * w);
                    } else if (h) {
                        height = h;
                        width = Math.round((img.naturalWidth / img.naturalHeight) * h);
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const picaInstance = pica();
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = img.naturalWidth;
                tempCanvas.height = img.naturalHeight;
                const tempCtx = tempCanvas.getContext("2d");

                if (downloadFormat === "jpg" || downloadFormat === "jpeg" || (downloadFormat === "webp" && webpWithBackground)) {
                    tempCtx.fillStyle = "#ffffff";
                    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                }

                tempCtx.drawImage(img, 0, 0);

                await picaInstance.resize(tempCanvas, canvas);

                canvas.toBlob(blob => {
                    if (!blob) {
                        return window.toastify("Failed to generate image.", "error");
                    }

                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = `${imageDets.title || "download"}.${downloadFormat}`;
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                    URL.revokeObjectURL(url);

                    setDownloadLoading(false);
                }, `image/${downloadFormat}`, 0.9);
            };

            img.onerror = () => {
                window.toastify("Failed to load image.", "error");
                setDownloadLoading(false);
            };

        } catch (err) {
            window.toastify(err.response?.data?.message || err.message || "Download failed", "error");
            setDownloadLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {/* resizeType={resizeType} setResizeType={setResizeType} resizeVal={resizeVal} setResizeVal={setResizeVal} */}
            <Dcards imageDets={imageDets} setImageDets={setImageDets} similarImages={similarImages} setSimilarImages={setSimilarImages} dimensions={dimensions} resizeWidth={resizeWidth} setResizeWidth={setResizeWidth} resizeHeight={resizeHeight} setResizeHeight={setResizeHeight} downloadFormat={downloadFormat} setDownloadFormat={setDownloadFormat} withBackground={withBackground} setWithBackground={setWithBackground} handleDownload={handleDownload} downloadLoading={downloadLoading} />
        </>
    );
}