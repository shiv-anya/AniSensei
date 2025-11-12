"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Banner } from "./Banner";

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToPrevious = () => {
    const isFirst = currentIndex === 0;
    const newIndex = isFirst ? movies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLast = currentIndex === movies.length - 1;
    const newIndex = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsTouchDevice(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // ✅ Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum px distance to trigger swipe
    if (Math.abs(diff) > threshold) {
      if (diff > 0) goToNext(); // swipe left → next
      else goToPrevious(); // swipe right → prev
    }
  };

  return (
    <div
      className="h-[80vh] relative w-full mx-auto overflow-hidden top-28 shadow-banner rounded-[2.5rem] mb-40 lg:mb-56 max-h-[500px] md:max-h-[570px]"
      onTouchStart={isTouchDevice ? handleTouchStart : undefined}
      onTouchMove={isTouchDevice ? handleTouchMove : undefined}
      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
    >
      {/* Slides container */}
      <div
        className="h-full flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${
            isTouchDevice ? translateX : 0
          }px))`,
        }}
      >
        {movies.map((anime, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Banner
              name={anime.title.english}
              date={anime.startDate}
              type={anime.format}
              rating={anime.averageScore}
              about={anime.description}
              img={anime.coverImage.extraLarge}
              id={anime.id}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="max-lg:hidden absolute top-[55%] left-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition duration-400 ease-in hover:bg-blue-500/70"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="max-lg:hidden absolute top-[55%] right-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition duration-700 ease-in hover:bg-blue-500/70"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Carousel;
