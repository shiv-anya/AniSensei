"use client";

import { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import AnimesList from "../../_components/AnimesList";
import { SEARCH_QUERY } from "../../_graphql/queries";
import { useRouter, useSearchParams } from "next/navigation";

function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearchInput = searchParams.get("query") || "";
  const [searchInput, setSearchInput] = useState(initialSearchInput);
  const [format, setFormat] = useState(searchParams.get("format") || "");
  const searchRef = useRef(null);
  const [focus, setFocus] = useState(false);

  const debouncedSearch = useDebounce(searchInput, 1000);

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
    <div className="w-[80%] mx-auto h-auto pb-[40vh] max-w-screen-xl">
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
            value={searchInput}
            ref={searchRef}
            onChange={(e) => {
              setSearchInput(e.target.value);
              const params = new URLSearchParams();
              if (e.target.value.length > 0) {
                params.set("query", e.target.value);
              }
              router.push(`?${params.toString()}`, { scroll: false });
            }}
            onClick={() => setFocus(true)}
            className="w-full h-full rounded-2xl p-4 text-gray-300 outline-none"
            type="text"
            name="movie searchbox"
            placeholder="Search for movies and tv shows"
          />
        </div>

        <div>
          <div className="text-sm flex gap-2 my-8">
            {["", "MOVIE", "TV"].map((type) => (
              <button
                key={type}
                className={`px-6 py-2 border border-gray-600 rounded-xl hover:bg-blue-500 transition duration-400 ${
                  format === type ? "bg-blue-400" : ""
                }`}
                onClick={() => setFormat(type)}
              >
                {type === "" ? "All" : type}
              </button>
            ))}
          </div>

          <AnimesList
            query={SEARCH_QUERY}
            filters={{ search: debouncedSearch, format }}
          />
        </div>
      </div>
    </div>
  );
}
