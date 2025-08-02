"use client";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import AnimeCard from "./AnimeCard";

export default function ListCarousel({
  animes,
  title,
  icon,
  height,
  itemsCountPerPage,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(itemsCountPerPage);
  const totalItems = animes.length;

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
    <section className={`w-full mb-32`} style={{ height: `${height}vh` }}>
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
