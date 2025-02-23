import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

export default function HomeSectionCarousel({ productsData, sectionName }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const responsive = {
    0: { items: 1 },
    480: { items: 2 },
    720: { items: 2.5 },
    1020: { items: 3 },
    1280: { items: 4 },
    1440: { items: 4.5 },
    1620: { items: 5.5 },
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = (event) => {
    setActiveIndex(event.item);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  const items = productsData.map((item, index) => (
    <HomeSectionCard key={index} product={item} />
  ));

  return (
    <>
      <div className="px-4 lg:px-8 border rounded-md">
        <h2 className="text-2xl font-extrabold text-gray-800 py-5">
          {sectionName}
        </h2>
        <div className="relative p-5">
          <AliceCarousel
            items={items}
            responsive={responsive}
            disableButtonsControls
            disableDotsControls
            onSlideChanged={syncActiveIndex}
            activeIndex={activeIndex}
            ref={carouselRef}
          />
          {!(activeIndex === items.length - 1) && (
            <Button
              variant="contained"
              className="z-50 "
              onClick={slideNext}
              sx={{
                position: "absolute",
                top: "8rem",
                right: "0rem",
                transform: "translateX(50%) rotate(90deg)",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#f2f2f2",
                },
              }}
              aria-label="next"
              // disabled={activeIndex === items.length - 1}
            >
              <KeyboardArrowLeftIcon
                sx={{ transform: "rotate(90deg)", color: "black" }}
              />
            </Button>
          )}

          {!(activeIndex === 0) && (
            <Button
              variant="contained"
              className="z-50"
              onClick={slidePrev}
              sx={{
                position: "absolute",
                top: "8rem",
                left: "0rem",
                transform: "translateX(-50%) rotate(90deg)",
                bgcolor: "white",
                "&:hover": {
                  bgcolor: "#f2f2f2",
                },
              }}
              aria-label="previous"
              disabled={activeIndex === 0}
            >
              <KeyboardArrowLeftIcon
                sx={{ transform: "rotate(-90deg)", color: "black" }}
              />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
