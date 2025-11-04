"use client";

import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
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
  const [isTouchEnabled, setIsTouchEnabled] = useState(false);
  const totalItems = animes.length;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const pages = chunkArray(animes, itemsPerSlide);
  const totalPages = pages.length;

  function chunkArray(arr, n) {
    const pages = [];
    for (let i = 0; i < arr.length; i += n) {
      pages.push(arr.slice(i, i + n));
    }
    return pages;
  }

  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      setIsTouchEnabled(width < 1024); // ✅ enable swipe only below lg

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
    setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

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
      if (diff > 0) handleNext(); // swipe left → next
      else handlePrev(); // swipe right → prev
    }
  };

  return (
    <section
      className={`w-full mb-24 md:mb-32`}
      style={{
        height: `${responsiveHeight}vh`,
        maxHeight: `${responsiveMaxH}px`,
      }}
    >
      <div className="h-[10%] text-xl lg:text-2xl flex justify-between py-2 mb-8 items-center">
        <div className="flex gap-2 items-center">
          <span className="text-blue-500">{icon}</span>
          <h2 className="capitalize font-semibold">{title}</h2>
        </div>
        <div className="flex gap-3 max-lg:hidden">
          <button
            className="bg-black/50 text-base p-2 rounded-xl hover:bg-blue-500 transition duration-700"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          {!(currentIndex < 0) && (
            <button
              className="bg-black/50 text-base p-2 rounded-xl hover:bg-blue-500 transition duration-400"
              onClick={handleNext}
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-full h-[90%] mx-auto overflow-hidden">
        <ul
          className="h-full flex transition-transform duration-700 ease-in-out"
          style={{
            // transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
            transform: `translateX(-${currentIndex * itemsPerSlide * 5}%)`,
            width: `${totalPages * 100}%`,
          }}
          onTouchStart={isTouchEnabled ? handleTouchStart : undefined}
          onTouchMove={isTouchEnabled ? handleTouchMove : undefined}
          onTouchEnd={isTouchEnabled ? handleTouchEnd : undefined}
        >
          {pages.map((page, pageIdx) => (
            <li key={pageIdx} className="w-[100%] flex mx-2">
              {page.map((anime) => (
                <div
                  className="flex-none rounded-2xl overflow-hidden mx-2"
                  style={{
                    width: `${100 / itemsPerSlide - 1.2}%`,
                  }}
                  key={anime.id}
                >
                  <AnimeCard anime={anime} />
                </div>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
