import React from "react";
// import SearchBar from './SearchBar';
import { useNavigate } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";
import image1 from "../../assets/images/bg6.jpg";
import image2 from "../../assets/images/bg2.jpg";
import image3 from "../../assets/images/bg3.jpg";
import image4 from "../../assets/images/bg4.jpg";
import "./hero.css";

const Hero = () => {

  const navigate = useNavigate()

  return (
    <section className="relative mainContainer min-h-screen py-10  flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-xl opacity-70 animate-pulse"></div>
      <div
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl opacity-50 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full blur-lg opacity-60 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full px-4 md:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left animate-fade-in">
            <h1 className="!text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight flex flex-wrap">
              <span className="!text-3xl sm:!text-[48px] text-gray-900 mr-2">
                Find
              </span>
              <span className="!text-3xl sm:!text-[48px] bg-gradient-to-r from-[#38D179] via-[#04A24C] to-[#6FD38E] bg-clip-text text-transparent mr-2">
                Perfect
              </span>
              <span className="!text-3xl sm:!text-[48px] text-gray-900">
                Image
              </span>
            </h1>

            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
              Discover millions of high-quality, royalty-free images. Download
              instantly and bring your creative vision to life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group inline-flex items-center justify-center px-6 py-3 sm:px-6 sm:py-3 bg-[#07A34D] text-white rounded-[12px] font-semibold hover:bg-[#5fb179] transition-all hover:scale-105 shadow-lg hover:shadow-xl" onClick={() => navigate("/images")}>
                Start Exploring
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className="relative animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                    <img
                      src={image1}
                      alt="Mountain landscape"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                    <img
                      src={image2}
                      alt="Laptop setup"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                    <img
                      src={image3}
                      alt="Woman with laptop"
                      className="w-full h-36 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                    <img
                      src={image4}
                      alt="Green landscape"
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* <div className="absolute top-1/2 -left-6 w-10 h-10 bg-green-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <Star className="w-5 h-5 text-white" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
