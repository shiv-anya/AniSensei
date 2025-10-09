"use client";
import { MdLocalMovies } from "react-icons/md";
import AnimeCard from "./AnimeCard";
import { useEffect, useState } from "react";
import { getFavorites, removeFromFavorites } from "../actions/favorites";
import { FaRegTimesCircle } from "react-icons/fa";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../_context/AuthContext";

export const Favorites = () => {
  const [animeList, setAnimeList] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [clickedAnimeId, setClickedAnimeId] = useState(null);
  const userInfo = useAuth();
  const handleDeletion = async (animeId) => {
    setClickedAnimeId(animeId);
    setIsDeleting(true);
    const res = await removeFromFavorites(userInfo?.user?.email, animeId);
    setAnimeList(res.favorites);
    setIsDeleting(false);
  };
  useEffect(() => {
    const getAnimesList = async () => {
      const data = await getFavorites(userInfo?.user?.email);
      setAnimeList(data);
    };
    getAnimesList();
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8 w-full">
        <h2 className="text-5xl font-semibold">Favorites</h2>
        <div className="w-[30%] rounded-full bg-gradient-to-r from-blue-500 to-transparent h-2 mt-3"></div>
      </div>
      <div className="h-[82%] w-full">
        {animeList.length > 0 ? (
          <ul
            className="h-full overflow-y-auto
                scrollbar-none
                [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-900
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-blue-500
  [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-4 gap-4 pr-4"
          >
            {animeList.map((anime) => (
              <li key={anime.id}>
                <div className="overflow-hidden h-[30vh] max-h-48 rounded-2xl">
                  <AnimeCard anime={anime} />
                </div>
                <button
                  className="rounded-lg flex border-2 border-red-500 gap-1 justify-center items-center mx-auto my-2 py-2 px-4 cursor-pointer text-red-500 transition duration-500 hover:text-white hover:bg-red-500"
                  onClick={() => handleDeletion(anime?.id)}
                >
                  {isDeleting && clickedAnimeId === anime?.id ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <span className="text-xs">Delete </span>
                      <FaRegTimesCircle />
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-[50vh] bg-black/30 border border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-2 max-h-72">
            <span className="text-blue-400/50 text-6xl">
              <MdLocalMovies />
            </span>
            <h2 className="font-bold text-2xl">No results found.</h2>
            <p className="text-gray-400 text-center">
              Add on your Favorites, to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
