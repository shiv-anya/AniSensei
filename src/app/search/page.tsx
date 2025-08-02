"use client";

import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

export default function Search() {
  const searchRef = useRef(null);
  const [focus, setFocus] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="w-[80%] mx-auto h-screen pb-[10vh]">
      <div className="relative top-28">
        <div
          className={`flex w-full pl-4 rounded-2xl items-center border border-gray-600 ${
            focus ? "outline-2 outline-blue-400 outline-offset-2" : ""
          }`}
        >
          <span className="text-xl text-gray-300">
            <IoSearchOutline />
          </span>
          <input
            ref={searchRef}
            onClick={() => setFocus(true)}
            className="w-full h-full rounded-2xl p-4 text-gray-300 outline-none"
            type="text"
            name="movie searchbox"
            placeholder="Search for movies and tv shows"
          />
        </div>
        <div>
          <div className="text-sm flex gap-2 my-8">
            <button className="px-6 py-2 border border-gray-600 rounded-xl hover:bg-blue-500 transition duration-400">
              All
            </button>
            <button className="px-6 py-2 border border-gray-600 rounded-xl hover:bg-blue-500 transition duration-400">
              Movie
            </button>
            <button className="px-6 py-2 border border-gray-600 rounded-xl hover:bg-blue-500 transition duration-400">
              TV
            </button>
          </div>
          <div>
            <p className="text-center text-gray-400">
              Search to get results...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
