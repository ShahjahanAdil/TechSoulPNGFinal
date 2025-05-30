import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

import crownIcon from "../../assets/images/crown.png";
import pngBg from "../../assets/images/bgPNGFinal.jpg";
import ImageCard from "../ImageCard";
import { useAuthContext } from "../../contexts/AuthContext";
import axios from "axios";

const tabs = ["nature", "technology", "clothing", "food"];

const CardsSec = () => {
  const { userData } = useAuthContext();
  const [images, setImages] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [activeTab, setActiveTab] = useState("nature");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, [activeTab]);

  useEffect(() => {
    fetchFavourites();
  }, []);

  const fetchImages = () => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_HOST
        }/frontend/fetch-tab-images?category=${activeTab}`
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setImages(data.imgs);
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
    axios
      .get(
        `${import.meta.env.VITE_HOST}/frontend/favourites/get?userID=${
          userData.userID
        }`
      )
      .then((res) => {
        const { status, data } = res;
        if (status === 200) {
          setFavourites(data.userFavourites);
        }
      })
      .catch((err) => {
        console.error("Frontend POST error", err.message);
      });
  };

  const handleAddToFavourites = ({ imageID, imageURL, favourite, license }) => {
    const newFav = {
      userID: userData.userID,
      imageID,
      imageURL,
      favourite,
      license,
    };

    axios
      .post(`${import.meta.env.VITE_HOST}/frontend/favourites/add`, newFav)
      .then((res) => {
        const { data } = res;
        // const updatedImages = images.map(img => img.imageID === imageID ? { ...img, favourite: !img.favourite } : img)
        // setImages(updatedImages)
        const wasFav = favourites.some((fav) => fav.imageID === imageID);
        if (wasFav) {
          setFavourites((prev) =>
            prev.filter((fav) => fav.imageID !== imageID)
          );
        } else {
          setFavourites((prev) => [...prev, { imageID }]);
        }
        window.toastify(data.message, "success");
      })
      .catch((err) => {
        console.error("Frontend POST error", err.message);
      });
  };

  return (
    <div className="my-5 px-4">
      {/* Heading and Button */}
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-[24px] sm:text-[30px] font-bold">
          Explore popular creative Assets
        </h2>
        <button
          className="flex gap-2 items-center rounded-[12px] font-bold px-[20px] hover:gap-4 transition-all duration-300 text-[#5ABC84]"
          onClick={() => navigate("/images")}
        >
          Explore images <AiOutlineArrowRight />
        </button>
      </div>

      <div className="flex gap-3">
        {tabs?.map((cat, i) => {
          return (
            <button
              key={i}
              className={`capitalize text-[14px] sm:text-[18px] pb-1 rounded-sm transition-all duration-150 ease-in-out cursor-pointer font-bold text-[#333] border-b-[#5ABC84] ${
                cat === activeTab ? "border-b-4" : "border-none"
              }`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10">
        {images.map((img) => (
          <ImageCard
            key={img.imageID}
            img={img}
            pngBg={pngBg}
            crownIcon={crownIcon}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsSec;
