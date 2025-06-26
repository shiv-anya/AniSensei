"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Banner } from "./Banner";

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 50000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="h-[80vh] relative w-full mx-auto overflow-hidden top-28 shadow-banner rounded-[2.5rem] mb-56">
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Banner
              name={movie.name}
              date={movie.date}
              type={movie.type}
              rating={movie.rating}
              about={movie.about}
              img={movie.img}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrevious}
        className="absolute top-[55%] left-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition duration-400 ease-in hover:bg-blue-500/70 z-10"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute top-[55%] right-4 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition duration-700 ease-in hover:bg-blue-500/70 z-10"
      >
        <FaChevronRight size={20} />
      </button>
    </div>
  );
};

export default Carousel;
