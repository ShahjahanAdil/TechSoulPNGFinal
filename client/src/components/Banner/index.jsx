import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import Search from "../Search";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Banner() {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = () => {
    setLoading(true);
    axios.get(`${import.meta.env.VITE_HOST}/frontend/home/fetch-categories`)
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

  return (
    <div className="pt-6 pb-12 md:pt-10 px-2 text-center">
      <h1>
        20,189,213 Graphic Resources For Free Download
      </h1>
      <p className="text-sm md:text-lg text-gray-500 font-medium mt-2">
        Royalty Free Latest PNG Images, JPG, WEBP, Backgrounds, Illustrations
      </p>
      {/* <Search /> */}

      <div className="mt-5 mb-5 text-gray-600">
        <ul className="flex flex-wrap justify-center gap-2 cursor-pointer">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="bg-[#ececec] text-[10px] sm:text-[12px] flex items-center py-1 px-3 capitalize rounded-[8px] gap-2 whitespace-nowrap transition-all duration-150 ease-linear hover:bg-[#dfdfdf]"
              onClick={()=>navigate(`/images/${cat.category.toLowerCase()}`)}
            >
              <RiSearchLine /> {cat.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}