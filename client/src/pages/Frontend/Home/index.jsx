import React from "react";
import Stat from "../../../components/Stat";
import Testimonials from "../../../components/Testimonials";
import Contributors from "../../../components/Contributors";
import Section2 from "../../../components/Section2";
import CardsSec from "../../../components/CardsSec";
import SearchSection from "../../../components/SearchSection";
import RecentImages from "../../../components/RecentImages";

export default function Home() {
    return (
        <div className="overflow-x-hidden">
            <SearchSection />
            <RecentImages />
            {/* <Hero/> */}
            {/* <CardsSlider /> */}
            {/* <Cards /> */}
            <Section2 />
            <CardsSec />
            <Contributors />
            {/* <Slider2 /> */}
            <Testimonials />
            <Stat />
        </div>
    );
}