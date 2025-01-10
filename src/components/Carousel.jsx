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

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="carousel-container relative m-2 md:m-5 lg:m-10">
      <div
        className="carousel-wrapper flex overflow-hidden h-40 md:h-48"
        style={{ position: "relative", width: "100%", height: "fit" }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{
              width: "100%",
              flexShrink: 0,
              overflow: "hidden",
              position: "absolute",
              top: "0",
              left: "0",
              opacity: currentSlide === index ? 1 : 0,
              transition: "opacity 1s ease-in-out", // Smooth fade transition
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
                className="carousel-image w-full object-cover object-center h-[200px]"
              />
            </a>
          </div>
        ))}
      </div>

      <div
        className="carousel-buttons absolute bottom-2 left-0 right-0 text-center"
        style={{
          zIndex: 10,
        }}
      >
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              background: currentSlide === index ? "#fff" : "#bbb",
              border: "none",
              height: "5px", // Adjusted for better visibility
              width: "20px",
              margin: "0 5px",
              borderRadius: "10%",
            }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
