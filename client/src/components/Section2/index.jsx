import React from "react";
import img1 from "../../assets/images/mothers day.avif";
import img2 from "../../assets/images/no tobacco.avif";
import img3 from "../../assets/images/children day.avif";
import img4 from "../../assets/images/halloween.avif";
import img5 from "../../assets/images/halloween pumpkin.avif";
import img6 from "../../assets/images/novenmber.avif";
import img7 from "../../assets/images/divali.avif";
import img8 from "../../assets/images/diabtes.avif";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const images = [
  { src: img1, title: "Mother's day", count: "10532 PNG images" },
  { src: img2, title: "World no tobacco day", count: "526 PNG images" },
  { src: img3, title: "Children's day", count: "11227 PNG images" },
  { src: img4, title: "Halloween", count: "9582 PNG images" },
  { src: img5, title: "Halloween pumpkin", count: "10358 PNG images" },
  { src: img6, title: "Movember", count: "1875 PNG images" },
  { src: img7, title: "Diwali", count: "12952 PNG images" },
  { src: img8, title: "World diabetes day", count: "460 PNG images" },
];

export default function Section2() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mainContainer">
        <div className="flex justify-between items-start mt-5">
          <h3 className="px-4 !text-[20px] sm:!text-[32px] font-bold md:mb-3">
            Festival Featured images and collections
          </h3>

          <button
            className="hidden sm:flex gap-2 items-center rounded-[12px] font-bold px-[20px] hover:gap-4 transition-all duration-300 !text-[#5ABC84]"
            onClick={() => navigate("/images")}
          >
            Explore images <AiOutlineArrowRight />
          </button>
        </div>
        
        <p className="text-gray-500 ps-5 sm:text-[13px]">
          The festival is coming. These popular holiday collections are perfect
          for sharing and designing.
        </p>
        <section className="py-10 px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div
                key={index}
                className={`rounded-xl overflow-hidden shadow-sm ${index % 3 === 0 ? "bg-[#F5F6F5]" : "bg-[#F5E9D7]"
                  }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full sm:h-44 h-[100px] object-contain transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold !text-[12px] sm:!text-[16px]">
                    {img.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
