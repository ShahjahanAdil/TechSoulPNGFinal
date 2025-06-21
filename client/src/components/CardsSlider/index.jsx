// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./CardSlider.css";
// import card1 from "../../assets/images/pakflag.png";
// import card2 from "../../assets/images/f3.png";
// import card3 from "../../assets/images/dummy.jpg";
// import card4 from "../../assets/images/eid.jpg";
// import card5 from "../../assets/images/travel.jpg";
// import card6 from "../../assets/images/fathers day.jpg";

// const images = [
//   { src: card1, label: "PNG Images" },
//   { src: card2, label: "WEBP Images" },
//   { src: card3, label: "JPG Images" },
//   { src: card4, label: "Occasional Images" },
//   { src: card5, label: "JPEG Images " },
//   { src: card6, label: "Fathers Day" },
// ];
// function NextArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute -right-2 top-1/2 transform -translate-y-1/2 z-10 bg-[#333] p-2 rounded-full shadow cursor-pointer hover:bg-[#4eaa76cb]"
//       onClick={onClick}
//     >
//       <svg
//         className="w-6 h-6 text-white"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path
//           fillRule="evenodd"
//           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </div>
//   );
// }

// function PrevArrow(props) {
//   const { onClick } = props;
//   return (
//     <div
//       className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 bg-[#333] p-2 rounded-full shadow cursor-pointer hover:bg-[#4eaa76cb]"
//       onClick={onClick}
//     >
//       <svg
//         className="w-6 h-6 text-white"
//         fill="currentColor"
//         viewBox="0 0 20 20"
//       >
//         <path
//           fillRule="evenodd"
//           d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 10-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z"
//           clipRule="evenodd"
//         />
//       </svg>
//     </div>
//   );
// }

// function CardsSlider() {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 100,
//     autoplay: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="relative py-10 px-8">
//               <div className="py-8">
//                 <h3>Trending Now</h3>
//               </div>
//         <Slider {...settings}>
//           {images.map((img, index) => (
//             <div key={index} className="px-4">
//               <div
//                 className="relative h-52 bg-cover  bg-center bg-no-repeat rounded-md transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer group"
//                 style={{ backgroundImage: `url(${img.src})` }}
//               >
//                 <div className="absolute inset-0 bg-[#00000088] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

//                 <div className="absolute bottom-2 right-2 text-white text-[14px]  px-2 py-1 rounded z-20" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>
//                   {img.label}
//                 </div>

//                 <div className="absolute top-2 left-2 text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//                   3,120 images
//                 </div>

//                 <div className="absolute top-2 right-2 text-white bg-black/50 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
//                   abc
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// }

// export default CardsSlider;

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import './CardSlider.css';

import image1 from "../../assets/images/img-1.jpg";
import image2 from "../../assets/images/img-2.jpg";
import image3 from "../../assets/images/img-3.jpg";
import image4 from "../../assets/images/travel.jpg";
import image5 from "../../assets/images/fathers-day.jpg";
import image6 from "../../assets/images/bg4.jpg";

const images = [
  { id: 1, src: image1, alt: "Mountain landscape with clear sky" },
  { id: 2, src: image2, alt: "Couple in car reading a map" },
  { id: 3, src: image3, alt: "Technology and circuit board close-up" },
  { id: 4, src: image4, alt: "Travel destination" },
  { id: 5, src: image5, alt: "Father’s Day celebration" },
  { id: 6, src: image6, alt: "Creative background" },
];

const CardsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("");

  const goToPrevious = () => {
    setSlideDirection("left");
    setAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSlideDirection("right");
    setAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const getPreviousIndex = () =>
    currentIndex === 0 ? images.length - 1 : currentIndex - 1;

  const getNextIndex = () =>
    currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="mainContainer w-full bg-white">
      <h2 className="!text-[20px] sm:!text-[32px] font-bold px-4 pt-6 pb-4">
        Top Free Pics This Week
      </h2>

      <div className="relative w-full overflow-hidden px-4">
        <div className="flex items-center justify-center relative h-[20rem] md:h-[28rem] lg:h-[32rem]">
          {/* Left Navigation */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition-all hover:scale-110 group"
          >
            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>

          {/* Left Preview Image */}
          <div
            className="hidden md:block w-1/4 h-full relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={goToPrevious}
          >
            <img
              src={images[getPreviousIndex()].src}
              alt={images[getPreviousIndex()].alt}
              className={`w-full h-full object-cover absolute top-0 left-0 ${
                slideDirection === "left" ? "animate-slide-in-left" : ""
              }`}
              onAnimationEnd={() => setSlideDirection("")}
            />
            <div className="absolute top-0 left-0 h-full w-[20%] bg-[#1414142b] backdrop-blur-[5px] rounded-l-xl" />
          </div>

          {/* Center Image */}
          <div className="w-full md:w-2/4 h-full mx-2 relative rounded-xl overflow-hidden shadow-2xl aspect-[16/9]">
            <img
              key={images[currentIndex].id}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out absolute top-0 left-0 ${
                animating ? "animate-slide-in" : ""
              }`}
              onAnimationEnd={() => setAnimating(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>

          {/* Right Preview Image */}
          <div
            className="hidden md:block w-1/4 h-full relative rounded-xl overflow-hidden shadow-lg cursor-pointer"
            onClick={goToNext}
          >
            <img
              src={images[getNextIndex()].src}
              alt={images[getNextIndex()].alt}
              className={`w-full h-full object-cover absolute top-0 left-0 ${
                slideDirection === "right" ? "animate-slide-in-right" : ""
              }`}
              onAnimationEnd={() => setSlideDirection("")}
            />
            <div className="absolute top-0 right-0 h-full w-[20%] bg-[#1414142b] backdrop-blur-[5px] rounded-r-xl" />
          </div>

          {/* Right Navigation */}
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 text-white p-3 rounded-full transition hover:scale-110 group"
          >
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardsSlider;
