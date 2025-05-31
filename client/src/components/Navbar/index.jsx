import React, { useState } from "react";
import logooo from "../../assets/images/logo.png";
import crown from "../../assets/images/crown.png";
import { useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart, FaSearch, FaUser } from "react-icons/fa";
import { PiHeadphonesFill } from "react-icons/pi";
import { LuDownload, LuLogOut } from "react-icons/lu";
import userIcon from "../../assets/images/user.png";
// import { TbWorld } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { FaUserPlus, FaX } from "react-icons/fa6";
import { MdOutlineExplore } from "react-icons/md";
import "./navbar.css";

import { useAuthContext } from "../../contexts/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";
import { MdMenu } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";

import dayjs from "dayjs";

export default function Navbar() {
  const { userData, handleLogout, setLoading } = useAuthContext();

  const { logout } = useAuth0();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const isToday = dayjs(userData.lastDownloadDate).isSame(dayjs(), "day");
  const isPremium = userData?.plan === "premium";
  const dailyDownloadLimit = isPremium ? Infinity : 50;
  const usedDownloads = isToday ? userData.dailyDownloadCount : 0;
  const remainingDownloads = dailyDownloadLimit - usedDownloads;

  const logoutFunction = () => {
    setLoading(true)
    logout();
    handleLogout();
  };

  const handleSearch = () => {
    navigate(`/images?s=${searchText}`);
  };

  return (
    <div className="relative">
      <section className="flex items-center justify-between flex-wrap px-4 py-2">
        {/* logo */}

        <div className="flex flex-1 gap-4 lg:gap-10 items-center">
          <div className="logo">
            <img
              src={logooo}
              alt="logo"
              className="sm:w-[150px] w-[150px] cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
          <div className="search flex w-full max-w-[800px] justify-center">
            <div className="!w-[100%]">
              <div className="flex   items-center justify-center  border border-gray-200 transition-all duration-200 rounded-md ease-linear hover:ring-2 ring-[#71C194] hover:ring-offset-1 ring-offset-slate-50">
                <div className="relative group inline-block">
                  <button className=" px-2 sm:!text-[12px] text-[10px] text-[#666] bg-white  flex gap-1 items-center  rounded-l-md text-base">
                    Categories{" "}
                    <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-[130%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 delay-150 bg-white border z-9 border-gray-200 w-45 rounded-[5px]">
                    <ul className="flex flex-col items-start text-[12px] z-[99999999]">
                      {[
                        "PNG",
                        "JPG",
                        "WEBP",
                        "Backgrounds",
                        "Illustrations",
                      ].map((item, i) => {
                        return (
                          <li
                            key={i}
                            className="px-4 py-2 text-[#333] transition-all duration-500 ease-in-out hover:text-[#71C194] cursor-pointer flex items-center"
                          >
                            <input
                              type="radio"
                              name="imageType"
                              className="mr-2"
                            />
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Copyright images waiting for you to discover"
                  className="w-full bg-white  !text-[12px] sm:text-[12px] !border-none !p-3 text-sm md:text-base"
                  onChange={(e) =>
                    setSearchText(e.target.value.toLocaleLowerCase())
                  }
                  onKeyDown={(e) =>
                    e.key.toLocaleLowerCase() === "enter" && handleSearch()
                  }
                />

                <button
                  className="bg-[#6FD38E] text-white py-3 px-3 rounded-r-md flex items-center gap-1 !text-[10px] md:!text-[12px]"
                  onClick={handleSearch}
                >
                  <FaSearch className="!text-[10px]" />{" "}
                  <span className="!hidden sm:!block !text-[12px]">Search</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="nav-buttons flex items-center gap-4">
          <div className="flex items-center pl-4 border-l-2  border-gray-300">
            <button className="!text-[12px] hover:!text-[#71C194]" onClick={() => navigate("/images")}>
              Explore
            </button>
          </div>
          <div className="relative group inline-block text-left">
            {/* Language */}
            <button className="flex items-center gap-2 !text-[12px]">
              <GrLanguage className="!text-[18px]" /> Eng
              <IoIosArrowDown className="transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 z-20 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 delay-150 bg-white shadow-lg w-32 mt-2 rounded-md p-3">
              <div className="flex justify-between border-b pb-2 mb-2 text-[12px] font-medium">
                <span className="pb-1 !text-[14px]">Language</span>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 !text-[12px]">
                {[
                  "English",
                  "Español",
                  "Deutsch",
                  "Português (BR)",
                  "Français",
                  "Italiano",
                  "Nederlands",
                  "Polski",
                ].map((lang) => (
                  <li
                    key={lang}
                    className="flex justify-between items-center px-2 py-1 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    {lang}
                    {lang === "English" && (
                      <svg
                        className="w-4 h-4 text-black"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-3 ml-4 items-center">
          <div className="free-btns">
            <ul className="flex  gap-4">
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                {" "}
                Pricing
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                Freebies
              </li>
            </ul>
          </div>
          {/* Login Profile */}
          {userData.userID ? (
            <div className="nav-profile w-[30px] h-[30px] login relative group cursor-pointer">
              <img
                src={userIcon}
                alt={userData.username}
                className="w-full h-full object-contain"
              />
              <div className="absolute invisible group-hover:visible group-hover:opacity-100 group-hover:translate-y-[0px] opacity-50 translate-y-[20px] transition-all duration-200 flex flex-col items-center justify-between min-h-[400px] w-[400px] bg-white rounded-[12px] z-99 right-0 top-[35px] !p-5 shadow-lg">
                {/* <div className="absolute top-[15px] right-2">
                  <button
                    className="!text-[14px] hover:!text-red-500 hover:underline"
                    onClick={logoutFunction}
                  >
                    Logout
                  </button>
                </div> */}
                {/* Profile Content */}
                <div className="flex w-full justify-around px-3 py-4 bg-[#f3f3f3b5] rounded-[12px]">
                  <div className={`relative w-[72px] h-[72px] flex items-center justify-center border-2 bg-white
                      ${userData.plan === "premium"
                      ? "border-[#ffe895]"
                      : "border-[#efefef]"
                    } !p-3 rounded-[50px]`}
                  >
                    <img src={userIcon} alt="" />

                    <div
                      className="absolute z-99 top-[60%] -right-3 cursor-pointer shadow-xl w-[34px] h-[34px] flex justify-center items-center bg-white !p-1.5 rounded-[50px] "
                      onClick={() => navigate("/dashboard/subscriptions")}
                    >
                      {userData.plan === "premium" ? (
                        <svg
                          className="_tea4l2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="23"
                          aria-hidden="true"
                          viewBox="0 0 28 23"
                        >
                          <defs>
                            <linearGradient
                              id="isc2z30a"
                              x1="50%"
                              x2="50%"
                              y1="11.131%"
                              y2="57.082%"
                            >
                              <stop offset="0%" stopColor="#FFD700"></stop>
                              <stop offset="100%" stopColor="#FFC300"></stop>
                            </linearGradient>
                            <linearGradient
                              id="isc2z30c"
                              x1="90.916%"
                              x2="5.301%"
                              y1="61.059%"
                              y2="59.126%"
                            >
                              <stop offset="0%" stopColor="#FFD700"></stop>
                              <stop offset="100%" stopColor="#FFB800"></stop>
                            </linearGradient>
                            <linearGradient
                              id="isc2z30e"
                              x1="100%"
                              x2="22.218%"
                              y1="27.905%"
                              y2="95.888%"
                            >
                              <stop offset="0%" stopColor="#FFD700"></stop>
                              <stop offset="100%" stopColor="#FFC300"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            id="isc2z30b"
                            d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"
                          ></path>
                          <g fill="none" fillRule="evenodd">
                            <path
                              fill="url(#isc2z30a)"
                              fillRule="nonzero"
                              d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0"
                              transform="rotate(-20 8.867 9.333)"
                            ></path>
                            <path
                              fill="url(#isc2z30a)"
                              fillRule="nonzero"
                              d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0"
                              transform="scale(-1 1)rotate(-20 0 117.844)"
                            ></path>
                            <g transform="translate(1.281 1.389)">
                              <mask id="isc2z30d" fill="#fff">
                                <use href="#isc2z30b"></use>
                              </mask>
                              <use
                                fill="url(#isc2z30c)"
                                fillRule="nonzero"
                                href="#isc2z30b"
                              ></use>
                              <path
                                stroke="#FFF8DC"
                                strokeLinejoin="round"
                                strokeWidth=".933"
                                d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084"
                                mask="url(#isc2z30d)"
                                opacity=".504"
                              ></path>
                            </g>
                            <ellipse
                              cx="1.909"
                              cy="5.682"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <ellipse
                              cx="14"
                              cy="1.894"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <ellipse
                              cx="26.091"
                              cy="5.682"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <path
                              fill="#FFF8DC"
                              fillRule="nonzero"
                              d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z"
                              opacity=".7"
                            ></path>
                          </g>
                        </svg>
                      ) : (
                        <svg
                          className="_tea4l2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="23"
                          aria-hidden="true"
                          viewBox="0 0 28 23"
                        >
                          <defs>
                            <linearGradient
                              id="isc2z30a"
                              x1="50%"
                              x2="50%"
                              y1="11.131%"
                              y2="57.082%"
                            >
                              <stop offset="0%" stopColor="#C7C7C7"></stop>
                              <stop offset="100%" stopColor="#9C9C9C"></stop>
                            </linearGradient>
                            <linearGradient
                              id="isc2z30c"
                              x1="90.916%"
                              x2="5.301%"
                              y1="61.059%"
                              y2="59.126%"
                            >
                              <stop offset="0%" stopColor="#D2D2D2"></stop>
                              <stop offset="100%" stopColor="#C4C4C4"></stop>
                            </linearGradient>
                            <linearGradient
                              id="isc2z30e"
                              x1="100%"
                              x2="22.218%"
                              y1="27.905%"
                              y2="95.888%"
                            >
                              <stop offset="0%" stopColor="#E8E8E8"></stop>
                              <stop offset="100%" stopColor="#CFCFCF"></stop>
                            </linearGradient>
                          </defs>
                          <path
                            id="isc2z30b"
                            d="M25.455 3.662 22.47 18.458c-.116.35-6.731 1.579-9.755 1.579-2.808 0-9.639-1.23-9.756-1.579L0 3.662l7.948 5.016L12.715 0l4.826 8.678z"
                          ></path>
                          <g fill="none" fillRule="evenodd">
                            <path
                              fill="url(#isc2z30a)"
                              fillRule="nonzero"
                              d="M9.301 3.906 14 15.866H3.733l4.7-11.96a.467.467 0 0 1 .868 0"
                              transform="rotate(-20 8.867 9.333)"
                            ></path>
                            <path
                              fill="url(#isc2z30a)"
                              fillRule="nonzero"
                              d="m19.568 3.906 4.699 11.96H14l4.699-11.96a.467.467 0 0 1 .869 0"
                              transform="scale(-1 1)rotate(-20 0 117.844)"
                            ></path>
                            <g transform="translate(1.281 1.389)">
                              <mask id="isc2z30d" fill="#fff">
                                <use href="#isc2z30b"></use>
                              </mask>
                              <use
                                fill="url(#isc2z30c)"
                                fillRule="nonzero"
                                href="#isc2z30b"
                              ></use>
                              <path
                                stroke="#FFF"
                                strokeLinejoin="round"
                                strokeWidth=".933"
                                d="m23.712 14.935-.305.084a41.3 41.3 0 0 1-10.29 1.435l-.328.003v-.002q-5.422-.03-10.617-1.438l-.305-.084"
                                mask="url(#isc2z30d)"
                                opacity=".504"
                              ></path>
                            </g>
                            <ellipse
                              cx="1.909"
                              cy="5.682"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <ellipse
                              cx="14"
                              cy="1.894"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <ellipse
                              cx="26.091"
                              cy="5.682"
                              fill="url(#isc2z30e)"
                              fillRule="nonzero"
                              rx="1.909"
                              ry="1.894"
                            ></ellipse>
                            <path
                              fill="#FFF"
                              fillRule="nonzero"
                              d="M14.626 15.48a.7.7 0 0 1-1.224.051l-.028-.051-2.1-4.2a.7.7 0 0 1 1.226-.674l.026.048L14 13.602l1.474-2.948a.7.7 0 0 1 .889-.336l.05.023a.7.7 0 0 1 .336.889l-.023.05z"
                              opacity=".7"
                            ></path>
                          </g>
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start">
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-center items-center gap-1.5">
                        <p className="!text-[14px]">
                          <span className="!text-[14px] font-bold">
                            Username:
                          </span>{" "}
                          {userData?.username}
                        </p>
                        {/* <img src={userIcon} alt="" className="w-[15px]" /> */}
                      </div>
                      <div className="!mt-1 mb-3">
                        <p className="!text-[14px]">
                          <span className="!text-[14px] font-bold">ID:</span>{" "}
                          {userData.userID}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`!mt-1 flex justify-center items-center bg-[#E8E8E8] rounded-full ${userData.plan === "free"
                        ? "bg-[#E8E8E8]"
                        : "bg-linear-to-b from-[#FAD961] to-[#F76B1C] !text-[#fff]"
                        }`}
                    >
                      {" "}
                      <span
                        className={`!py-[5px] !text-[12px] sm:!text-[14px]  capitalize !px-[14px]`}
                      >
                        <span className="!text-[12px] sm:!text-[14px]">
                          {userData.plan}
                        </span>{" "}
                        user
                      </span>{" "}
                    </div>
                  </div>
                </div>

                {/* Download Status */}
                <div className="flex items-center !py-[15px] gap-10">
                  <div className="flex items-center flex-col">
                    <p className="!text-[20px] font-bold !text-[#333]">
                      {dailyDownloadLimit}
                    </p>
                    <p className="text-[#999] !text-sm">Daily Downloads</p>
                  </div>

                  <div className="flex items-center flex-col">
                    <p className="!text-[20px] font-bold !text-[#333]">
                      {remainingDownloads}
                    </p>
                    <p className="text-[#999] !text-sm">Remaning Downloads</p>
                  </div>
                </div>

                {/* Border Line */}

                <div className="border-t-2 w-full border-[#F7F7F7]"></div>

                {/* Sale banner */}
                <div className={`!mt-2 !p-[15px] relative flex flex-col items-center justify-center bg-[#FFFAEC] w-[350px] min-h-[100px] rounded-[12px] shadow-lg ${userData.plan === "premium" && "hidden"}`}>
                  <div className=" absolute top-1 left-1 z-30 flex flex-col justify-center !px-1">
                    <p className="!text-[12px] !text-white uppercase font-bold">
                      Sale
                    </p>
                    <p className="!text-[12px] !text-white uppercase font-bold">
                      80%
                    </p>
                  </div>
                  <div className="absolute top-[20px] right-[20px] -rotate-30">
                    <img src={crown} alt="" className="w-[40px]" />
                  </div>
                  <div className="absolute top-0 left-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="46"
                      height="50"
                      viewBox="0 0 46 50"
                      fill="none"
                    >
                      <path
                        d="M0 0H46V49.5L23 43.5L0 49.5V0Z"
                        fill="#FF3E7E"
                      ></path>
                    </svg>
                  </div>

                  <div className="flex flex-col items-center gap-1 ">
                    <p className="!text-[12px] !text-[#85713b]">
                      One Time payment
                    </p>
                    <p className="!text-[12px] font-medium !text-[#85713b]">
                      8,000,000+ curated assets
                    </p>
                    <p className="!text-[14px] !text-[#4e2d25] font-semibold">
                      Unlimited Lifetime Downloads
                    </p>
                  </div>

                  <button className="!mt-2 bg-linear-65 from-[#f7bc0b] !py-1 rounded-[8px] to-[#ff9900] w-full !text-[16px] font-bold !text-white">
                    Buy Now
                  </button>
                </div>

                {/* Help center */}
                <div className="!mt-5 flex gap-2 w-full">
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#edf7fa] hover:bg-[#e0f1f7] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <FaUser className="text-[#83cbd9] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !text-[14px] mt-2">
                      Profile
                    </p>
                  </div>
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/contact")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#fff6dc] hover:bg-[#f8eecf] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <PiHeadphonesFill className="text-[#f5ca73] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !text-[14px] mt-2">
                      Help Center
                    </p>
                  </div>
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/dashboard/downloads")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#EDFAF0] hover:bg-[#ddfae4] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <LuDownload className="text-[#83D99B] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !text-[14px] mt-2">
                      Downloads
                    </p>
                  </div>
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/dashboard/favourites")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#faeded] hover:bg-[#fce3e3] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <FaHeart className="text-[#ff9191] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !text-[14px] mt-2">
                      Favourites
                    </p>
                  </div>
                </div>
                {/* <div className="!mt-2 flex justify-evenly w-full">
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/dashboard/downloads")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#EDFAF0] hover:bg-[#ddfae4] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <LuDownload className="text-[#83D99B] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !py-2 !text-[14px]">
                      My Downloads
                    </p>
                  </div>
                  <div
                    className="flex flex-col w-[30%] items-center cursor-pointer"
                    onClick={() => navigate("/dashboard/favourites")}
                  >
                    <div className="flex flex-col items-center justify-center bg-[#faeded] hover:bg-[#fce3e3] transition-all duration-150 ease-linear w-[50px] h-[50px] rounded-[12px]">
                      <FaHeart className="text-[#ff9191] text-[20px]" />
                    </div>
                    <p className="!text-[#333] !py-2 !text-[14px]">
                      My Favourites
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          ) : (
            <div className="auth-btns flex gap-2">
              <button
                className="flex items-center gap-2 hover:bg-[#71C194] px-3 py-1 text-[#333] !text-[12px] hover:text-white rounded cursor-pointer"
                onClick={() => navigate("/auth/login")}
              >
                Log in
              </button>
              <button
                className="flex items-center gap-2 hover:bg-[#71C194] border border-gray-300 px-3 py-1 text-[#333] !text-[12px] hover:text-white rounded cursor-pointer"
                onClick={() => navigate("/auth/signup")}
              >
                SignUp
              </button>
            </div>
          )}

          {
            userData.userID &&
            <div className="relative">
              <div
                className="text-[18px] text-red-500 ml-1 cursor-pointer hover:text-red-400"
                onMouseEnter={() => setShowPopup(true)}
                onMouseLeave={() => setShowPopup(false)}
              >
                <LuLogOut onClick={logoutFunction} />
              </div>

              {/* Popup with transitions */}
              <div
                className={`absolute top-[115%] right-0 mt-1 bg-white shadow-md rounded-md px-2 py-1 z-10 border border-gray-200
                transform transition-all duration-200 ease-out
                ${showPopup ?
                    'opacity-100 scale-100 translate-y-0' :
                    'opacity-0 scale-95 translate-y-1'
                  }`}
              >
                <p className="!text-[12px] font-bold !text-red-400">Logout</p>
              </div>
            </div>
          }

          <div
            className="menu-icon flex flex-col items-center cursor-pointer border border-gray-300 p-2 rounded-[8px]"
            onClick={() => setMenuOpen(true)}
          >
            <MdMenu size={18} />
          </div>
        </div>
      </section>

      <section className="nav-bottom px-5 py-3 bg-[#fefefe] flex justify-between items-center ">
        <div className="menu">
          <div className="!flex gap-5 sm:!gap-3 justify-start items-center">
            <div className="relative group">
              <span className="cursor-pointer !text-[14px]">PNG</span>
              <div className="absolute top-3 left-0 hidden rounded-[10px] z-50  group-hover:block w-[500px] p-5 mt-3 bg-white shadow-lg ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-10px text-sm !rounded-4xl  text-gray-700">
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative group">
              <span className="cursor-pointer !text-[14px]">JPG</span>
              <div className="absolute top-3 left-0 hidden rounded-[10px] z-50  group-hover:block w-[500px] p-5 mt-3 bg-white shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative group">
              <span className="cursor-pointer !text-[14px]">WEBP</span>
              <div className="absolute top-3 left-0 hidden rounded-[10px] z-50  group-hover:block w-[500px] p-5 mt-3 bg-white shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative group">
              <span className="cursor-pointer !text-[14px]">Backgrounds</span>
              <div className="absolute top-3 left-0 hidden rounded-[10px] z-50  group-hover:block w-[500px] p-5 mt-3 bg-white shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative group">
              <span className="cursor-pointer !text-[14px]">Illustrations</span>
              <div className="absolute top-3 left-0 hidden rounded-[10px] z-50  group-hover:block w-[500px] p-5 mt-3 bg-white shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                  <ul>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                    <li className="gap-2 hover:text-green-400 cursor-pointer py-1.5">
                      nswqh
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="search-bar flex w-full justify-center">
          <div className="!w-[100%]">
            <div className="flex   items-center justify-center  border border-gray-200 transition-all duration-200 rounded-md ease-linear hover:ring-2 ring-[#71C194] hover:ring-offset-1 ring-offset-slate-50">
              <div className="relative group inline-block"></div>
              <input
                type="text"
                placeholder="Copyright images waiting for you to discover"
                className="w-full bg-white  !text-[12px] sm:text-[12px] !border-none !p-3 text-sm md:text-base"
                onChange={(e) =>
                  setSearchText(e.target.value.toLocaleLowerCase())
                }
                onKeyDown={(e) =>
                  e.key.toLocaleLowerCase() === "enter" && handleSearch()
                }
              />

              <button
                className="bg-[#6FD38E] text-white py-3 px-3 rounded-r-md flex items-center gap-1 !text-[10px] md:!text-[12px]"
                onClick={handleSearch}
              >
                <FaSearch className="!text-[10px]" />{" "}
                <span className="!hidden sm:!block !text-[12px]">Search</span>
              </button>
            </div>
          </div>
        </div>

        <div className="left-menu flex items-center gap-3 justify-center">
          <button className="flex items-center sm:rounded-[8px] !text-[14px] rounded cursor-pointer">
            Pricing
          </button>
          <button className="!text-[14px] sm:rounded-[8px]">Freebies</button>
        </div>
      </section>

      <section
        className={`fixed top-0 left-0 z-999 bg-[#efefef] h-screen w-full sm:w-[400px] transition-all duration-300 ease-in-out ${menuOpen ? "toggle-menu-active" : "toggle-menu"
          }`}
      >
        <div className="flex flex-col gap-3 p-8">
          <div className="flex items-center justify-between pb-3">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>
              <FaX />
            </button>
          </div>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2 !text-[14px] cursor-pointer hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
              {" "}
              <FaRegUser className="!text-[16px]" />
              Login
            </li>
            <li className="flex items-center gap-2 !text-[14px] cursor-pointer hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
              {" "}
              <FaUserPlus className="!text-[16px]" />
              SignUp
            </li>
            <li className="flex items-center gap-2 !text-[14px] cursor-pointer hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
              {" "}
              <MdOutlineExplore className="!text-[16px]" />
              Explore
            </li>
            <li className="flex items-center gap-2 !text-[14px] cursor-pointer hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
              {" "}
              <GrLanguage className="!text-[16px]" />
              English
            </li>
          </ul>

          <div className="w-full border-gray-300 border-t-2"></div>
          <div>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                {" "}
                PNG
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                JPG
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                WEBP
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                Backgrounds
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                Illustrations
              </li>
            </ul>
          </div>
          <div className="w-full border-gray-300 border-t-2"></div>
          <div className="free-nav-btns">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                {" "}
                Pricing
              </li>
              <li className="flex items-center gap-2 cursor-pointer !text-[14px] hover:!text-[#6FD38E] hover:!font-bold transition-all ease-linear duration-200">
                Freebies
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
