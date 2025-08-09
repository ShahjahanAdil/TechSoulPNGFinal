import React from "react";
// import Banner from "../../../components/Banner";
// import CardsSlider from "../../../components/CardsSlider";
// import Cards from "../../../components/Cards";
import Stat from "../../../components/Stat";
import Testimonials from "../../../components/Testimonials";
import Contributors from "../../../components/Contributors";
import Section2 from "../../../components/Section2";
// import Section3 from "../../../components/Section3";
// import Background from "../../../components/Background";
import Slider2 from "../../../components/Slider2";
import CardsSec from "../../../components/CardsSec";
// import Hero from "../../../components/Hero";
import SearchSection from "../../../components/SearchSection";
import RecentImages from "../../../components/RecentImages";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <SearchSection />
      <RecentImages />
      {/* <Hero/> */}
      {/* <Banner /> */}
      {/* <CardsSlider /> */}
      {/* <Cards /> */}
      <Section2 />
      <CardsSec/>
      {/* <Section3 /> */}
      {/* <Background /> */}
      <Contributors />
      {/* <Slider2 /> */}
      <Testimonials />
      <Stat />
    </div>
  );
}
