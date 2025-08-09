import React, { useRef, useState, useEffect } from "react";
import blurBlobs from '../../../assets/images/blur-blobs.svg'
import { Upload, X, Loader2, Download } from "lucide-react";
import { useAuthContext } from "../../../contexts/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../configs/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import BGRemoverUse from "../../../components/BGRemoverUse";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    }
};

const dropAreaVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    }
};

export default function BGRemover() {

    const { userData, dispatch } = useAuthContext();
    const [image, setImage] = useState(null);
    const [userImageURL, setUserImageURL] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [processedUrl, setProcessedUrl] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef(null);

    useEffect(() => {
        let interval;
        if (loading) {
            setProgress(0);
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 95) {
                        clearInterval(interval);
                        return prev;
                    }
                    return prev + (100 / 50);
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [loading]);

    const handleImageChange = async (file) => {
        if (!file.type.startsWith("image/")) {
            return toast.error("Only images allowed");
        }
        setSelectedFile(file);
        setProcessedUrl(null);
        setUserImageURL("");
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleImageURLChange = (e) => {
        const url = e.target.value.trim();
        if (url && !url.match(/^https?:\/\/.+/)) {
            toast.error("Please enter a valid URL");
            return;
        }
        setUserImageURL(url);
        setSelectedFile(null);
        setProcessedUrl(null);
        setImage(url || null);
    };

    const handleRemoveBackground = async () => {
        if (!selectedFile && !userImageURL) return toast.error("Select an image first or paste image URL");
        setLoading(true);

        let imageUrl = "";

        if (selectedFile) {
            imageUrl = await uploadImageToFirebase(selectedFile);
        } else if (userImageURL) {
            imageUrl = userImageURL;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_HOST}/frontend/remove-bg`,
                { imageUrl, userID: userData.userID }
            );

            const processedImageUrl = data.processedImageUrl;

            const fullImageUrl = processedImageUrl.startsWith('http')
                ? processedImageUrl
                : `${import.meta.env.VITE_HOST}${processedImageUrl.startsWith('/') ? '' : '/'}${processedImageUrl}`;

            setImage(fullImageUrl);
            setProcessedUrl(processedImageUrl);
            if (userData?.userID) {
                dispatch({ type: "SET_PROFILE", payload: { userData: { ...userData, conversions: userData?.conversions + 1 } } })
            }
            setProgress(100);
            toast.success("Background removed!");
        } catch (err) {
            console.error(err);
            toast.error("Removal failed");
            toast.error(err?.message);
            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    const uploadImageToFirebase = async (file) => {
        const extension = file.name.split('.').pop();
        const uniqueFilename = `image-${uuidv4()}.${extension}`;
        const storageRef = ref(storage, `uploads/${uniqueFilename}`);
        try {
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);
            return downloadURL;
        } catch (error) {
            console.error("Error uploading image to Firebase:", error);
            throw error;
        }
    };

    const handleClear = () => {
        if (processedUrl) URL.revokeObjectURL(processedUrl);
        setImage(null);
        setSelectedFile(null);
        setUserImageURL("");
        setProcessedUrl(null);
        setProgress(0);
    };

    return (
        <>
            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                id="upload"
                className="relative min-h-[calc(90vh-80px)] sm:min-h-[calc(100vh-80px)] flex flex-col items-center justify-center  px-3 sm:px-5 py-20 overflow-hidden"
            >
                <div className="absolute top-0 right-20 -z-1">
                    <img src={blurBlobs} alt="blur-blobs" className='w-[450px] blur-blobs' />
                </div>

                <motion.div
                    variants={itemVariants}
                    className="relative inline-block mb-12"
                >
                    <h1 className="w-full max-w-[500px] !text-[24px] sm:!text-[30px] md:!text-[36px] font-extrabold text-center text-gray-800 leading-tight">
                        <span className="!text-[24px] sm:!text-[28px] md:!text-[36px] text-[#5abc84]">Remove background</span> of your image instantly
                    </h1>
                    <motion.span
                        animate={{
                            y: [-5, 5, -5],
                            transition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                        className="absolute -top-12 right-5 sm:-top-2 sm:-right-5"
                    >
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.8, 1, 0.8],
                                transition: {
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="block w-4 h-4 bg-[#5abc84] rounded-full"
                        />
                    </motion.span>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="w-full max-w-lg text-center space-y-6"
                >
                    <motion.div
                        variants={dropAreaVariants}
                        onClick={() => fileInputRef.current.click()}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            if (e.dataTransfer.files[0]) handleImageChange(e.dataTransfer.files[0]);
                        }}
                        onDragOver={(e) => (e.preventDefault(), setIsDragging(true))}
                        onDragLeave={() => setIsDragging(false)}
                        className={`relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl bg-white transition-all duration-300 ease-linear cursor-pointer hover:bg-[#5abc84]/10
        ${isDragging ? "border-green-400 bg-blue-50 animate-pulse" : "border-gray-300 hover:border-green-100"}
        ${image ? "!border-[#5abc84] p-2" : "p-8"}`}
                    >
                        {image ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`relative w-full ${loading ? "animate-pulse" : ""}`}
                            >
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="mx-auto h-full max-h-[300px] rounded-xl transition-opacity duration-500 opacity-100"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleClear}
                                    disabled={loading}
                                    className="absolute top-2 right-2 bg-white p-1 cursor-pointer rounded-full shadow hover:bg-red-100 transition"
                                    title="Clear"
                                >
                                    <X className="w-5 h-5 text-red-500" />
                                </motion.button>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    whileHover={{ y: -2 }}
                                >
                                    <Upload className="h-12 w-12 text-gray-400 mb-4" />
                                </motion.div>
                                <p className="text-lg text-gray-600">
                                    Drag & drop an image<br />or click to select
                                </p>
                                <p className="mt-2 text-sm text-gray-400 italic">
                                    JPG, PNG, WEBP (max 5MB)
                                </p>
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={(e) => e.target.files && handleImageChange(e.target.files[0])}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <p>OR</p>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            name="userImageURL"
                            id="userImageURL"
                            value={userImageURL}
                            placeholder="Paste URL of image here"
                            className="w-full p-3 mt-5 text-[#666] rounded-[12px] outline-none border bg-white !border-gray-200 focus:!border-[var(--primary-color)]"
                            onChange={handleImageURLChange}
                        />
                    </motion.div>

                    {(selectedFile || userImageURL) && !processedUrl ? (
                        <motion.div
                            variants={itemVariants}
                            className="space-y-3"
                        >
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={handleRemoveBackground}
                                disabled={loading}
                                className={`inline-flex items-center justify-center px-6 py-3 mb-5 bg-red-100 ${loading ? 'text-red-400' : 'text-red-500'} font-semibold rounded-lg ${loading ? '!cursor-default' : 'cursor-pointer'} shadow ${!loading && "hover:bg-[#ffd4d4]"} transition-colors duration-200 ease-linear`}
                            >
                                {loading && <Loader2 className="animate-spin h-5 w-5 mr-2" />}
                                {loading ? "Removing..." : "Remove Background"}
                            </motion.button>
                            {loading && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full max-w-[200px] mx-auto"
                                >
                                    <div className="relative w-full h-2 bg-gray-200 rounded-full">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                            className="absolute h-full bg-blue-500 rounded-full"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Processing: {Math.round(progress)}%
                                    </p>
                                </motion.div>
                            )}
                        </motion.div>
                    ) : null}

                    {processedUrl && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={async () => {
                                try {
                                    const imageUrl = processedUrl.startsWith("http")
                                        ? processedUrl
                                        : `${import.meta.env.VITE_HOST}${processedUrl.startsWith("/") ? "" : "/"}${processedUrl}`;

                                    const response = await fetch(imageUrl);
                                    if (!response.ok) throw new Error("Failed to fetch image");
                                    const blob = await response.blob();
                                    const blobUrl = window.URL.createObjectURL(blob);

                                    const link = document.createElement("a");
                                    link.href = blobUrl;
                                    link.download = "no-bg.png";
                                    document.body.appendChild(link);
                                    link.click();

                                    document.body.removeChild(link);
                                    window.URL.revokeObjectURL(blobUrl);
                                } catch (error) {
                                    console.error("Download failed:", error);
                                    toast.error("Failed to download image");
                                }
                            }}
                            className="inline-flex items-center justify-center px-6 py-3 mt-3 bg-[#5abc84] text-white font-semibold rounded-lg cursor-pointer shadow-lg transition-colors duration-200 ease-linear hover:bg-[#5abc84]/80"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Download PNG
                        </motion.button>
                    )}
                </motion.div>

                <ToastContainer position="top-center" autoClose={2000} />
            </motion.div >
            <BGRemoverUse />
        </>
    );
}