"use client";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function ListCarousel({
  animes,
  title,
  icon,
  height,
  maxH,
  itemsCountPerPage,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsCountPerPage);
  const [responsiveHeight, setResponsiveHeight] = useState(height);
  const [responsiveMaxH, setResponsiveMaxH] = useState(maxH);
  const totalItems = animes.length;

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;

      if (width < 640)
        setItemsPerSlide(Math.max(2, Math.floor(itemsCountPerPage / 4)));
      else if (width < 1024)
        setItemsPerSlide(Math.max(2, Math.floor(itemsCountPerPage / 2)));
      else if (width < 1280)
        setItemsPerSlide(Math.max(2, Math.floor(itemsCountPerPage * 0.75)));
      else setItemsPerSlide(itemsCountPerPage);

      if (width < 640) {
        setResponsiveHeight(height * 0.5);
        setResponsiveMaxH(maxH * 0.6);
      } else if (width < 1024) {
        setResponsiveHeight(height * 0.8);
        setResponsiveMaxH(maxH * 0.8);
      } else {
        setResponsiveHeight(height);
        setResponsiveMaxH(maxH);
      }
    };

    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, [itemsCountPerPage]);

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerSlide >= totalItems ? 0 : prev + itemsPerSlide
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev - itemsPerSlide < 0
        ? Math.max(
            0,
            totalItems - (totalItems % itemsPerSlide || itemsPerSlide)
          )
        : prev - itemsPerSlide
    );
  };

  return (
    <section
      className={`w-full mb-24 md:mb-32`}
      style={{
        height: `${responsiveHeight}vh`,
        maxHeight: `${responsiveMaxH}px`,
      }}
    >
      <div className="h-[10%] text-2xl flex justify-between py-2 mb-8 items-center">
        <div className="flex gap-2 items-center">
          <span className="hover:animate-shake text-blue-500">{icon}</span>
          <h2 className="capitalize font-semibold">{title}</h2>
        </div>
        <div className="flex gap-3">
          <button
            className="bg-black/50 text-base p-2 rounded-xl hover:bg-blue-500 transition duration-700"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className="bg-black/50 text-base p-2 rounded-xl hover:bg-blue-500 transition duration-400"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
      <div className="relative w-full h-[90%] mx-auto overflow-hidden">
        <ul
          className="h-full flex gap-6 transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
          }}
        >
          {animes.map((anime, idx) => (
            <li
              key={idx}
              className="flex-none rounded-2xl overflow-hidden"
              style={{
                width: `${100 / itemsPerSlide}%`,
              }}
            >
              <AnimeCard anime={anime} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
