import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Home from "./Home";
import DownloadPage from './DownloadPage'
import Main from "./Main";
import About from "./About/index";
import ContactPage from "./ContactPage/index";
import Footer from "../../components/Footer";
import Reviews from "./Reviews";
import Legal from "./Legal";
import Help from "./Help";
import Popular from "./Popular";
import FAQs from "./FAQs";
import Blogs from "./Blogs";
import Blog from "./Blogs/Blog";

export default function Frontend() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/image/:imageID" element={<DownloadPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/help-center" element={<Help />} />
        <Route path="/legal/:legalPage" element={<Legal />} />
        <Route path="/popular-searches" element={<Popular />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs/:category" element={<FAQs />} />
        <Route path="/images" element={<Main />} />
        <Route path="/images/:category" element={<Main />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
      <Footer />
    </>
  );
}