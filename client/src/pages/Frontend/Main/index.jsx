import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import pngBg from "../../../assets/images/bgPNGFinal.jpg";
import errorImg from "../../../assets/images/404.jpg";
import Loader from "../../../components/Loader";
import crownIcon from "../../../assets/images/crown.png";
// import Search from "../../../components/Search";
import { FaHeart } from "react-icons/fa";
import { useAuthContext } from "../../../contexts/AuthContext";
import { MdOutlineFileDownload } from "react-icons/md";
import dayjs from "dayjs";
import axios from "axios";

export default function Main() {

    const { category } = useParams();
    const searchParams = new URLSearchParams(window.location.search);
    const searchText = searchParams.get("s") || '';
    const filter = searchParams.get("filter") || null;

    const { userData, dispatch, isGuest, guestData } = useAuthContext();
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [totalImagePages, setTotalImagePages] = useState(1);
    const [favourites, setFavourites] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [shortDownloadLoading, setShortDownloadLoading] = useState(false);
    const [downloadingImageID, setDownloadingImageID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchFavourites();
    }, []);

    useEffect(() => {
        fetchImages();
        window.scrollTo(0, 0);
    }, [page, category, searchText, filter]);

    useEffect(() => {
        setPage(1);
    }, [category]);

    const fetchCategories = () => {
        setLoading(true);
        axios.get(`${import.meta.env.VITE_HOST}/frontend/main/fetch-categories`)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setCategories(data.cats);
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
        const params = new URLSearchParams();
        params.set("page", page);

        if (category) {
            params.set("category", category);
        }

        if (filter) {
            params.set("filter", filter);
        }

        if (searchText) {
            params.set("searchText", searchText);
        }

        const apiURL = `${import.meta.env.VITE_HOST}/frontend/main/fetch-images?${params.toString()}`;

        setLoading(true);
        axios.get(apiURL)
            .then((res) => {
                const { status, data } = res;
                if (status === 200) {
                    setImages(data.imgs);
                    setTotalImagePages(Math.ceil(data?.totalImgs / 25));
                }
            })
            .catch((err) => {
                console.error("Frontend POST error", err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // const fetchImages = () => {
    //     const apiURL = `${import.meta.env.VITE_HOST}/frontend/main/fetch-images?page=${page}` +
    //         (category
    //             ? `&category=${category}`
    //             : searchText
    //                 ? `&searchText=${searchText}`
    //                 : "");

    //     const apiFilterURL = `${import.meta.env.VITE_HOST}/frontend/main/fetch-images?page=${page}` +
    //         (filter
    //             ? `&filter=${filter}`
    //             : filter && searchText
    //                 ? `&filter=${filter}&searchText=${searchText}`
    //                 : "");

    //     setLoading(true);
    //     axios.get(filter ? apiFilterURL : apiURL)
    //         .then((res) => {
    //             const { status, data } = res;
    //             if (status === 200) {
    //                 setImages(data.imgs);
    //                 setTotalImagePages(Math.ceil(data?.totalImgs / 25));
    //             }
    //         })
    //         .catch((err) => {
    //             console.error("Frontend POST error", err.message);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

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
    };

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
                    { userID: userData.userID }
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

            const response = await fetch(`${import.meta.env.VITE_HOST}${img.imageURL}`, { mode: "cors" });

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

    const [buttonsPerPage, setButtonsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const updateButtonsPerPage = () => {
            const width = window.innerWidth;
            if (width < 640) setButtonsPerPage(4);
            else if (width < 768) setButtonsPerPage(8);
            else if (width < 1024) setButtonsPerPage(12);
            else setButtonsPerPage(20);
        };

        updateButtonsPerPage();
        window.addEventListener("resize", updateButtonsPerPage);
        return () => window.removeEventListener("resize", updateButtonsPerPage);
    }, []);

    const totalPages = Math.ceil(categories.length / buttonsPerPage);

    const next = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const prev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    const sliderWidth = `${100 * totalPages}%`;
    const slideOffset = `-${(100 / totalPages) * currentPage}%`;

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalImagePages; i++) {
            pages.push(
                <button
                    key={i}
                    className={`px-3 py-1 rounded-[5px] cursor-pointer hover:!bg-[#666] hover:!text-white ${page === i
                        ? "!bg-[#5ABC84] !text-white"
                        : "!bg-[#e8e8e8] !text-[#666]"
                        }`}
                    onClick={() => setPage(i)}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {/* <Search /> */}
            <div className="mainContainer">
                {/* Heading Secttion */}
                <section className="pt-12 pb-8 px-2 sm:px-4">
                    <div className="flex items-center gap-2">
                        <a href="#" className="text-[#666] text-sm">
                            Pngtree &gt;
                        </a>{" "}
                        <span className="text-[#666] !text-sm capitalize"> {category}</span>
                    </div>
                    <div>
                        <h2 className="text-[20px] sm:text-[26px] lg:text-[32px] font-bold text-[#333] !mb-3">
                            Free Graphic Design PNG, JPG and Image Files
                        </h2>

                        <p className="text-base text-[#333]">
                            Download free graphic design PNG images, JPG and WEBP images for
                            your design inspiration.
                        </p>
                        <p className="text-base text-[#333]">
                            PNG, JPG, WEBP, Backgrounds and Illustrastions are all available.
                        </p>
                    </div>
                </section>

                {/* Slider */}
                <div className="relative w-full overflow-hidden !px-2 !sm:px-4">
                    {/* Arrows */}
                    <div className="absolute top-1/2 -translate-y-1/2 -left-2 z-10">
                        <button
                            onClick={prev}
                            disabled={currentPage === 0}
                            className="cursor-pointer disabled:cursor-default"
                        >
                            <ChevronLeft
                                className={`w-6 h-6 !text-[#5ABC84] ${currentPage !== 0 ? "cursor-pointer" : "opacity-20"
                                    }`}
                            />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10">
                        <button
                            onClick={next}
                            disabled={currentPage === totalPages - 1}
                            className="cursor-pointer disabled:cursor-default"
                        >
                            <ChevronRight
                                className={`w-6 h-6 text-[#5ABC84] ${currentPage !== totalPages - 1
                                    ? "cursor-pointer"
                                    : "opacity-20"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Slider Track */}
                    <div className="w-full overflow-hidden mb-5 md:mb-10">
                        <div
                            className="flex transition-transform gap-1 sm:gap-2 duration-150 ease-in-out"
                            style={{
                                width: sliderWidth,
                                transform: `translateX(${slideOffset})`,
                            }}
                        >
                            {categories.map((cat, index) => (
                                <button
                                    key={index}
                                    className={`flex items-center justify-center w-fit text-center capitalize truncate px-2 py-1 sm:px-4 sm:py-2 hover:!bg-[#71C194] text-[10px] sm:text-sm text-[#666] hover:!text-white font-bold rounded-lg transition-all duration-300 ${cat.category.toLowerCase() === category ? '!bg-[#71C194] !text-[#fff]' : '!bg-[#eeeeeeae]'}`}
                                    onClick={() =>
                                        navigate(`/images/${cat.category.toLowerCase()}`)
                                    }
                                >
                                    {cat.category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Images */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-2 sm:px-4 pb-10">
                        {images.map((img) => (
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
                                    src={`${import.meta.env.VITE_HOST}${img.imageURL}`}
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
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-[300px]">
                            <img src={errorImg} alt="error" className="w-full" />
                        </div>
                        <p className="py-2 px-4 my-5 rounded-[12px] bg-red-100 !text-red-400">
                            Uh-oh! No image found.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {!loading && totalImagePages > 1 && (
                    <div className="flex flex-wrap my-10 items-center justify-center gap-1">
                        {renderPageNumbers()}
                    </div>
                )}
            </div>
        </>
    );
}
