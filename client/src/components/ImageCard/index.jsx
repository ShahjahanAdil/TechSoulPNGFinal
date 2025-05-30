import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ImageCard({ img, pngBg, crownIcon }) {

    const navigate = useNavigate()

  return (
    <div
      key={img.imageID}
      className="   relative w-full sm:h-[250px] h-[150px] cursor-pointer overflow-hidden rounded-lg shadow-sm group"
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
      <div className="absolute inset-0 bg-[#0000004f] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col justify-between px-2 py-2">
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
          <div className="flex justify-center items-center gap-2">
            <span className="bg-white text-gray-500 !text-[10px] uppercase px-2 py-1.5 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
              <FaHeart className="!text-[12px]" />
            </span>
            <span className="bg-[#4EAA76] text-white !text-[12px] uppercase px-2 py-1 rounded shadow transform scale-0 opacity-0 transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 !flex items-center gap-1">
              <MdOutlineFileDownload className="!text-[14px]" /> {img.type}
            </span>
          </div>
        </div>
        <p className="!text-white text-xs px-1">{img.title}</p>
      </div>
    </div>
  );
}
