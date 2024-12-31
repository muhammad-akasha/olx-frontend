"use client";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      link: "https://www.olx.com.pk",
      imgSrc: "/carousel-image.jpeg",
      alt: "Feature Your Ad & Reach Up To 20x More Buyers!",
    },
    {
      link: "https://www.zong.com.pk/prepaid/weekly-digital-max?utm_source=OLX&utm_medium=OLX&utm_campaign=Zong_Weekly_Digital_Max_Dec_24&utm_id=Zong_Weekly_Digital_Max_Dec_24",
      imgSrc: "/carousel-image-1.webp",
      alt: "Zong - Weekly Max",
    },
    {
      link: "https://www.zong.com.pk/prepaid/weekly-digital-max?utm_source=OLX&utm_medium=OLX&utm_campaign=Zong_Weekly_Digital_Max_Dec_24&utm_id=Zong_Weekly_Digital_Max_Dec_24",
      imgSrc: "/carousel-image-2.webp",
      alt: "Zong - Weekly Digital Max",
    },
  ];

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="carousel-container m-2 md:m-5 lg:m-10  h-[100px] sm:h-[150px]"
      style={{ position: "relative" }}
    >
      <div
        className="carousel-wrapper"
        style={{ display: "flex", overflow: "hidden" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              width: "100%",
              flexShrink: 0,
              overflow: "auto",
              display: currentSlide === index ? "block" : "none",
            }}
          >
            <a
              href={slide.link}
              target="_blank"
              rel="noopener noreferrer"
              title={slide.alt}
            >
              <img
                src={slide.imgSrc}
                alt={slide.alt}
                className="carousel-image"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "100%",
                }}
              />
            </a>
          </div>
        ))}
      </div>

      <div
        className="carousel-buttons"
        style={{
          position: "absolute",
          bottom: "10px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              background: currentSlide === index ? "#fff" : "#bbb",
              border: "none",
              height: "2px",
              width: "20px",
              margin: "0 5px",
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
