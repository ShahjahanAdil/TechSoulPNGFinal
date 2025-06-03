import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import "./Footer.css";
import bankCard from "../../assets/images/bankcards.jpeg";
import { AiOutlineCopyright } from "react-icons/ai";

const Footer = () => {
  return (
    <>
      <section className="footer bg-[#FAFAFB] py-6 px-7 border-b-2 border-[#efefef] flex flex-col justify-between gap-5 lg:flex-row">
        {/* Left Section */}
        <div className="left-foot">
          <div className="logo-side flex flex-col items-start gap-8">
            <img src={logo} alt="logo" className="w-44" />
            <div className="overflow-hidden md:w-auto lg:w-[500px]">
              <p className="font-light text-sm">
                Our platform offers a vast library of high-quality PNG images
                and creative assets tailored for designers. With powerful AI
                tools like image generation and background removal, we help
                creators work faster and smarter — using fully licensed content
                ready for commercial use.
              </p>
            </div>

            {/* Social Icons */}
            <div className="social-icons flex gap-3 mt-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaFacebookF size={18} />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#1DA1F2] w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaTwitter size={18} />
              </Link>
              <Link
                to="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E60023] text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaPinterestP size={18} />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
              >
                <FaInstagram size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-foot flex flex-col justify-center gap-10 px-5 sm:flex-row sm:gap-20">
          {/* PNGTREE Section */}
          <div className="png-tree w-1/2">
            <div className="inner-items">
              <h6 className="font-bold uppercase !text-[16px]">PNGTREE.COM</h6>
              <ul className=" mt-2">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/popular-searches"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Popular Searches
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Update
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    New Background
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    AI Image Generator
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    AI Remove
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Plans & Help */}
          <div className="plan-help w-1/2">
            <div className="plan">
              <h4 className="font-bold uppercase !text-[16px]">PLANS</h4>
              <ul className=" mt-2">
                <li>
                  <Link
                    to="/dashboard/subscriptions"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Basic Plan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/subscriptions"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Premium Plan
                  </Link>
                </li>
              </ul>
            </div>
            <div className="help">
              <h4 className="font-bold uppercase !text-[16px]">HELP</h4>
              <ul className="">
                <li>
                  <Link
                    to="/help-center"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal */}
          <div className="legal w-1/2">
            <div className="inner-items">
              <h4 className="font-bold uppercase !text-[16px]">LEGAL</h4>
              <ul className="!mt-2 flex flex-col gap-[10px]">
                <li>
                  <Link
                    to="/legal/terms"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Term of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/privacy"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/copyrights"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Copyrights
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/cookies"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Cookies Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/license"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    License Terms
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/refund"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal/intellectual-property"
                    className="text-sm text-gray-700 hover:text-green-600"
                  >
                    Intellectual Property Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Bank Card Section */}
      <div className="copy-right !py-3 !px-5 flex flex-wrap flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1">
          <span><AiOutlineCopyright className="text-[#666]" /></span>
          <span className="!text-[#666] !text-sm">
            2017-2025 Pngtree -All Rights Reserved.
          </span>
          <span className="!text-[#666] !text-sm">
            Contact Email: info@pngtree.com
          </span>
        </div>
        <div className="flex items-center">
          <img src={bankCard} alt="bankcards" />
        </div>
      </div>
    </>
  );
};

export default Footer;
