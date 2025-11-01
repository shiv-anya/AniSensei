"use client";
import { MdLocalMovies } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { FaRegTimesCircle } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../_context/AuthContext";
import { getHistory, removeFromHistory } from "@/app/actions/history";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

function AnimeCard({ anime, lastWatched, progress, handleDeletion }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  const urlTitle = anime.title.split(" ").join("-").toLowerCase();
  return (
    <Link href={`/browse/${anime.id}/${urlTitle}`} className="cursor-pointer">
      <div className="w-full flex items-center justify-between p-4 rounded-xl hover:shadow-animecard bg-transparent relative">
        {/* Left: Cover Image */}
        <div className="relative w-20 h-28 rounded-lg">
          <Image
            fill
            src={anime.coverImage}
            sizes="20"
            alt={anime.title}
            className="absolute object-cover rounded-lg"
          />
          <div className="absolute bottom-0 bg-gray-900 w-full h-1 rounded-b-lg">
            <div
              className={`bg-blue-400 h-1 rounded-b-lg`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Middle: Info Section */}
        <div className="flex-1 px-4">
          <p className="text-lg font-semibold text-white truncate">
            {anime.title}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Last watched:{" "}
            {new Date(lastWatched).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }) || "N/A"}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Progress: {Math.floor(progress) || 0}%
          </p>
        </div>

        {/* Right: 3-dot Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMenuOpen((prev) => !prev);
            }}
            className="text-gray-400 hover:text-white transition"
          >
            <BsThreeDotsVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#1a1a1a] text-gray-200 rounded-lg shadow-lg py-2 z-10">
              <button
                className="w-full text-left px-4 py-2 hover:cursor-pointer text-red-400"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleDeletion(anime.id);
                }}
              >
                Remove History
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export const History = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clickedAnimeId, setClickedAnimeId] = useState(null);
  const userInfo = useAuth();
  const handleDeletion = async (animeId) => {
    setClickedAnimeId(animeId);
    setIsDeleting(true);
    const res = await removeFromHistory(userInfo?.user?.email, animeId);
    setAnimeList(res.history);
    setIsDeleting(false);
  };
  useEffect(() => {
    const getAnimesList = async () => {
      const data = await getHistory(userInfo?.user?.email);
      setAnimeList(data.history);
    };
    getAnimesList();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8 max-md:mb-0 w-full">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold">
          Watch History
        </h2>
        <div className="w-[30%] rounded-full bg-gradient-to-r from-blue-500 to-transparent h-2 mt-3"></div>
      </div>
      <div className="h-[82%] w-full">
        {animeList.length > 0 ? (
          <ul
            className="w-full h-full overflow-y-auto
                scrollbar-none
                [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-900
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-500
  [&::-webkit-scrollbar-thumb]:rounded-full p-4 flex flex-col gap-5"
          >
            {animeList.map((data) => (
              <li key={data._id} className="w-full h-fit">
                <div className="w-full h-40 md:h-36 lg:h-[20vh] max-h-36 rounded-2xl">
                  <AnimeCard
                    anime={data.anime}
                    lastWatched={data.lastWatched}
                    progress={data.progress}
                    handleDeletion={handleDeletion}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-[50vh] max-h-72 bg-black/30 border border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-2">
            <span className="text-blue-400/50 text-6xl">
              <MdLocalMovies />
            </span>
            <h2 className="font-bold text-2xl">No results found.</h2>
            <p className="text-gray-400 text-center">
              Add on your watchlist, to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
