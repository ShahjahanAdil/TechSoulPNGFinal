import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardVoice } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuArrowRight } from 'react-icons/lu';

export default function HomeSearchBar() {

    const [searchText, setSearchText] = useState("");
    const [searchCategory, setSearchCategory] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestionLoading, setSuggestionLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        setShowSuggestions(true)
        setSuggestionLoading(true);

        if (!searchText.trim()) {
            return setSuggestions([]);
        }

        const delayDebounce = setTimeout(() => {
            setSuggestionLoading(true);

            const categoryParam = searchCategory ? `&category=${encodeURIComponent(searchCategory)}` : "";

            axios.get(`${import.meta.env.VITE_HOST}/frontend/home/search-suggestions?q=${encodeURIComponent(searchText)}${categoryParam}`)
                .then(res => {
                    const { status, data } = res;
                    if (status === 200) {
                        setSuggestions(data.results || []);
                    }
                })
                .catch(err => {
                    console.error("Suggestion fetch error:", err);
                    setSuggestions([]);
                })
                .finally(() => setSuggestionLoading(false));
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchText, searchCategory]);

    useEffect(() => {
        handleSearch()
    }, [searchCategory])

    useEffect(() => {
        setSuggestions([])
        setShowSuggestions(false)
    }, [pathname])

    const handleSearch = () => {
        if (searchText === "") return
        const trimmedText = searchText.trim();

        if (searchCategory && trimmedText) {
            navigate(`/images?filter=${encodeURIComponent(searchCategory.toLowerCase())}&s=${encodeURIComponent(trimmedText)}`);
        } else if (searchCategory && !trimmedText) {
            navigate(`/images?filter=${encodeURIComponent(searchCategory.toLowerCase())}`);
        } else {
            navigate(`/images?s=${encodeURIComponent(trimmedText)}`);
        }

        setShowSuggestions(false)
        axios.post(`${import.meta.env.VITE_HOST}/frontend/searches/add?searchText=${encodeURIComponent(trimmedText)}`)
            .then(res => {
                setShowSuggestions(false)
            })
            .catch(err => {
                console.error("Suggestion fetch error:", err);
            })
    };

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const startListening = () => {
        if (!recognition) {
            alert("Voice search not supported in this browser.");
            return;
        }

        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            const voiceText = event.results[0][0].transcript;
            setSearchText(voiceText.toLowerCase());
            // handleSearch();
        };

        recognition.onerror = (event) => {
            console.error('Voice recognition error:', event.error);
            setListening(false);
        };

        recognition.onend = () => {
            setListening(false);
        };
    };

    return (
        <div className={`flex w-full max-w-[800px] justify-center`}>
            <div className="!w-[100%] relative bg-white rounded-md">
                <div className="flex items-center justify-center border border-gray-200 transition-all duration-200 rounded-md ease-linear hover:ring-2 ring-[#71C194] hover:ring-offset-1 ring-offset-slate-50">

                    {/* Category Dropdown */}
                    <div className="relative group inline-block">
                        <button className="px-2 sm:!text-[12px] text-[10px] text-[#666] bg-white flex gap-1 items-center rounded-l-md text-base">
                            {!searchCategory ? 'Categories' : searchCategory}
                            <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                        </button>
                        <div className="absolute top-[135%] z-[99999] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 delay-150 bg-white border border-gray-200 w-45 rounded-[5px]">
                            <div className="flex flex-col items-start text-[12px] py-2">
                                {["All", "PNG", "JPG", "WEBP", "Backgrounds", "Illustrations"].map((item, i) => (
                                    <div
                                        key={i}
                                        className="px-3 py-1 cursor-pointer flex items-center"
                                        onClick={() => setSearchCategory(item.toLowerCase() === 'all' ? null : item)}
                                    >
                                        <input type="radio" name="imageType" className="mr-2" id={`${item}`} />
                                        <label htmlFor={`${item}`} className="!text-[14px] !text-[#333] transition-all duration-300 ease-linear hover:!text-[#71C194]">{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={searchText}
                            placeholder={`${searchCategory ? searchCategory : ''} Images waiting for you to discover`}
                            className="w-full bg-white !text-[12px] sm:text-[12px] !border-none !p-3 text-sm md:text-base"
                            onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                            onKeyDown={(e) => e.key.toLowerCase() === "enter" && handleSearch()}
                        />

                        <div className="w-8 h-8 flex justify-center items-center absolute top-1/2 right-0 sm:right-2 -translate-y-1/2 text-[#666] cursor-pointer rounded-full transition-all duration-100 ease-linear hover:text-[#5ab16d]"
                            role='button' onClick={startListening}
                        >
                            <MdKeyboardVoice className={`text-[20px] ${listening ? 'text-[#5ab16d]' : ''}`} />
                        </div>

                        {/* Suggestions Dropdown */}
                        {searchText && showSuggestions && (
                            <ul className="absolute left-0 top-full mt-1 w-full z-50 bg-white border border-gray-200 rounded-md shadow-md">
                                {suggestionLoading ? (
                                    <li className="p-2 text-sm text-gray-500">
                                        <div className="flex justify-center items-center">
                                            <span className="w-[40px] h-[40px] rounded-full border-t-4 border-gray-400 animate-spin"></span>
                                        </div>
                                    </li>
                                ) : (
                                    <>
                                        {suggestions.length > 0 ? (
                                            <>
                                                {suggestions.map((item) => (
                                                    <li
                                                        key={item._id}
                                                        className="p-2 flex items-center gap-2 cursor-pointer rounded-[8px] hover:bg-gray-100"
                                                        onClick={() => {
                                                            navigate(`/image/${item.imageID}`)
                                                            setSearchText(item.title)
                                                            setSuggestions([])
                                                            setShowSuggestions(false)
                                                        }}
                                                    >
                                                        <img
                                                            src={`${import.meta.env.VITE_ASURA_SUBDOMAIN}${item.imageURL}`}
                                                            alt={item.title}
                                                            className="w-8 h-8 object-cover rounded"
                                                        />
                                                        <span className="text-sm text-gray-700">{item.title}</span>
                                                    </li>
                                                ))}
                                                <li
                                                    className="flex gap-1 items-center justify-center p-2 text-center text-sm text-[#5ABC84] cursor-pointer hover:bg-gray-50 font-medium"
                                                    onClick={() => {
                                                        navigate(`/images?s=${encodeURIComponent(searchText)}`)
                                                        setShowSuggestions(false)
                                                        setSuggestions([])
                                                    }}
                                                >
                                                    View more results <LuArrowRight />
                                                </li>
                                            </>
                                        ) : (
                                            <li className="p-2 text-sm text-red-500">No related results found.</li>
                                        )}
                                    </>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* Search Button */}
                    <button
                        className="bg-[#71C194] text-white py-3 px-3 rounded-r-md flex items-center gap-1 !text-[10px] md:!text-[12px]"
                        onClick={handleSearch}
                    >
                        <FaSearch className="!text-[10px]" />
                        <span className="!hidden sm:!block !text-[12px]">Search</span>
                    </button>
                </div>
            </div>
        </div>
    )
}