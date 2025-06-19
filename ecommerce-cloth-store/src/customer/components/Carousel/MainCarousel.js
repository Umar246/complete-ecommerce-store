import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarouselData";

export default function MainCarousel() {
  const items = MainCarouselData.map((item) => (
    <img
      className="cursor-pointer bg-[#f2f2f2] h-[30vh] w-full md:h-full"
      src={item.image}
      alt="Carousel_Image"
      role="presentation"
    />
  ));

  return (
    <div className="bg-[#f2f2f2]">
      <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
      />
    </div>
  );
}
