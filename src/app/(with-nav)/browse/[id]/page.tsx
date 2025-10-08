"use client";
import { SEARCH_BY_ID } from "@/app/_graphql/queries";
import { fetchAniList } from "@/app/_lib/fetchAniList";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoPlayOutline } from "react-icons/io5";
import { PiYoutubeLogoLight } from "react-icons/pi";
import { BsBookmarkCheck } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { RxInfoCircled } from "react-icons/rx";
import { IoIosGlobe, IoMdTime } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { FaStar } from "react-icons/fa6";
import { MdOutlineMovieFilter } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { TbTag } from "react-icons/tb";
import GenreRecommendations from "@/app/_components/GenreRecommendations";
import { addToWatchlist, removeFromWatchlist } from "@/app/actions/watchlist";
import { BeatLoader } from "react-spinners";
import { useAuth } from "@/app/_context/AuthContext";
import { addToFavorites, removeFromFavorites } from "@/app/actions/favorites";

enum Month {
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
}

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours > 0 ? hours + " hr " : ""}${
    minutes > 0 ? minutes + " min" : ""
  }`.trim();
}

export default function AnimeInfo() {
  const userInfo = useAuth();
  const [anime, setAnime] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isPendingWatchlist, setIsPendingWatchlist] = useState(false);
  const [isPendingFavorites, setIsPendingFavorites] = useState(false);
  const { id } = useParams();
  let isAnimeInWatchlist;
  let isAnimeInFavorites;
  if (userInfo?.user?.watchlist) {
    isAnimeInWatchlist = userInfo?.user?.watchlist.find(
      (w) => w.anime.id.toString() === id.toString()
    );
  }
  const [isSuccessWatchlist, setIsSuccessWatchlist] =
    useState(isAnimeInWatchlist);
  const [isSuccessFavorites, setIsSuccessFavorites] =
    useState(isAnimeInFavorites);
  const day = String(anime?.startDate.day).padStart(2, "0");
  const month = Month[anime?.startDate.month - 1];
  const year = anime?.startDate.year;
  const formattedDate = `${day} ${month}, ${year}`;
  const cleanDescription = anime?.description
    ?.replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?i>/gi, "")
    .replace(/<\/?[^>]+(>|$)/g, "");
  const getAnimeById = async (id) => {
    const data = await fetchAniList({ query: SEARCH_BY_ID, variables: { id } });
    setAnime(data.Media);
  };
  const handleAddAnimeToFavorites = async () => {
    setIsPendingFavorites(true);
    const res = await addToFavorites(userInfo?.user?.email, anime);
    if (res.success) setIsSuccessFavorites(true);
    setIsPendingFavorites(false);
  };
  const handleAddAnimeToWatchList = async () => {
    setIsPendingWatchlist(true);
    const res = await addToWatchlist(userInfo?.user?.email, anime);
    if (res.success) {
      setIsSuccessWatchlist(true);
    }
    setIsPendingWatchlist(false);
  };
  const handleRemoveFromFavorites = async () => {
    setIsPendingFavorites(true);
    const res = await removeFromFavorites(userInfo?.user?.email, anime?.id);
    setIsSuccessFavorites(false);
    setIsPendingFavorites(false);
  };
  const handleRemoveFromWatchlist = async () => {
    setIsPendingWatchlist(true);
    const res = await removeFromWatchlist(userInfo?.user?.email, anime?.id);
    if (res.success) setIsSuccessWatchlist(false);
    setIsPendingWatchlist(false);
  };
  useEffect(() => {
    getAnimeById(id);
  }, [id]);
  return (
    <section className="h-auto pt-30 pb-10">
      <div className="w-[80%] mx-auto">
        <Link href="/" className="inline">
          <button className="flex items-center justify-between backdrop-blur-sm px-5 py-2 rounded-sm transition duration-700 hover:bg-gray-400/50  cursor-pointer">
            <FaArrowLeft /> <span className="ml-5">Home</span>
          </button>
        </Link>
        <div className="w-full mt-5 flex gap-16">
          <aside className="w-[20%]">
            {anime && (
              <Image
                src={anime?.coverImage?.extraLarge}
                width={150}
                height={200}
                alt="cover image"
                className="rounded-xl w-full bg-gradient-to-b from-black/80 via-transparent via-50% to-black/80 to-98%"
              />
            )}
            <div className="w-full mt-5 flex flex-col gap-2">
              <Link
                href={`/browse/${anime?.id}/${anime?.title.english
                  .split(" ")
                  .join("-")
                  .toLowerCase()}`}
                className="w-full py-3 text-sm transition duration-700 hover:bg-blue-500/80 cursor-pointer font-semibold flex justify-center items-center gap-2 rounded-lg bg-blue-500"
              >
                <IoPlayOutline size={18} />
                Watch Now
              </Link>
              {anime?.trailer?.site === "youtube" && (
                <Link
                  href={`https://www.youtube.com/watch?v=${anime?.trailer.id}`}
                  target="_blank"
                >
                  <button className="w-full py-3 text-sm transition duration-700 hover:bg-gray-600 cursor-pointer border border-gray-500 font-semibold flex justify-center items-center gap-2 rounded-lg bg-gray-700 text-red-400">
                    <PiYoutubeLogoLight />{" "}
                    <span className="text-white">Watch Trailer</span>
                  </button>
                </Link>
              )}
            </div>
            <div className="my-5 flex flex-col gap-2">
              {isSuccessFavorites ? (
                <button
                  className="w-full px-2 py-2 flex justify-center items-center bg-black/20 rounded-lg gap-2 transition duration-700 hover:bg-black/50 text-sm"
                  onClick={handleRemoveFromFavorites}
                >
                  {isPendingFavorites ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <AiOutlineHeart size={18} className="text-red-400" />
                      <span>Loved</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="w-full px-2 py-2 flex justify-center items-center bg-black/20 rounded-lg gap-2 transition duration-700 hover:bg-black/50 text-sm disabled:bg-gray-700 disabled:cursor-not-allowed"
                  onClick={handleAddAnimeToFavorites}
                  disabled={!userInfo.user}
                  title={
                    !userInfo.user
                      ? "login or signup to track your own favorites"
                      : ""
                  }
                >
                  {isPendingFavorites ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <AiOutlineHeart size={15} />
                      <span>Favorite</span>
                    </>
                  )}
                </button>
              )}
              {isSuccessWatchlist ? (
                <button
                  className="w-full px-2 py-2 flex justify-center items-center bg-black/20 rounded-lg gap-2 transition duration-700 hover:bg-black/50 text-sm cursor-pointer"
                  onClick={handleRemoveFromWatchlist}
                >
                  {isPendingWatchlist ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <BsBookmarkCheck size={15} className="text-blue-500" />
                      <span>Listed</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  className="w-full px-2 py-2 flex justify-center items-center bg-black/20 rounded-lg gap-2 transition duration-700 hover:bg-black/50 text-sm cursor-pointer disabled:bg-gray-700 disabled:cursor-not-allowed"
                  onClick={handleAddAnimeToWatchList}
                  disabled={!userInfo.user}
                  title={
                    !userInfo.user
                      ? "login or signup to track your own watchlist"
                      : ""
                  }
                >
                  {isPendingWatchlist ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    <>
                      <BsBookmark size={15} />
                      <span>Watch Later</span>
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="text-sm flex flex-col gap-5 bg-gray-900 backdrop-blur-sm border border-gray-600 px-4 py-5 rounded-lg">
              <h2 className="text-blue-500 flex gap-2 items-center">
                <RxInfoCircled size={18} />
                <span className="text-white text-lg">Media Info</span>
              </h2>
              <ul className="flex flex-col gap-5 w-full">
                <li className="text-blue-500 w-full  flex gap-2 items-center">
                  <SlCalender size={12} />
                  <span className="text-white">{`Released: ${formattedDate}`}</span>
                </li>
                <li className="text-blue-500 w-full  flex gap-2 items-center">
                  <IoMdTime size={18} />
                  <span className="text-white">{`Runtime: ${
                    formatDuration(anime?.duration) +
                    `${anime?.format !== "MOVIE" ? " /episode" : ""}`
                  }`}</span>
                </li>
                <li className="text-blue-500 w-full  flex gap-2 items-center">
                  <RxInfoCircled size={18} />
                  <span className="text-white">{`Status: ${anime?.status}`}</span>
                </li>
                <li className="text-blue-500 w-full  flex gap-2 items-center">
                  <IoIosGlobe size={18} />
                  <span className="text-white">{`Language: ${anime?.countryOfOrigin}`}</span>
                </li>
              </ul>
            </div>
          </aside>
          <article className="w-[80%]">
            <h2 className="font-bold text-6xl">
              {anime?.title.english + " " + `(${anime?.startDate.year})`}
            </h2>
            <div className="flex text-sm gap-3 my-5">
              <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
                <span className="text-blue-500 text-base">
                  <CiCalendar />
                </span>
                {formattedDate}
              </div>
              <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
                <span className="text-blue-500 text-base">
                  <MdOutlineMovieFilter />
                </span>
                {anime?.format}
              </div>
              <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
                <span className="text-yellow-500 text-base">
                  <FaStar />
                </span>
                {anime?.averageScore}
              </div>
            </div>
            <div>
              <div
                className={`bg-black/30 flex p-2 rounded-xl ${
                  anime?.format === "MOVIE" ? "w-[40%]" : "w-[60%]"
                }`}
              >
                <button
                  className={`cursor-pointer ${
                    anime?.format === "MOVIE" ? "w-full" : "w-1/2"
                  } px-4 py-1 rounded-lg ${
                    activeTab === "overview" ? "bg-blue-500" : ""
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  Overview
                </button>
                {anime?.format !== "MOVIE" && (
                  <button
                    className={`cursor-pointer w-1/2 px-4 py-1 rounded-lg ${
                      activeTab === "seasons" ? "bg-blue-500" : ""
                    }`}
                    onClick={() => setActiveTab("seasons")}
                  >
                    Seasons
                  </button>
                )}
              </div>
              {activeTab === "overview" && (
                <div>
                  <div>
                    <h2 className="flex items-center text-blue-500 gap-2 my-5">
                      <RxInfoCircled size={20} />{" "}
                      <span className="text-3xl font-semibold text-white">
                        Overview
                      </span>
                    </h2>
                    <div className="bg-gray-900 backdrop-blur-sm p-5 rounded-xl border border-gray-600">
                      {cleanDescription}
                    </div>
                  </div>
                  <div>
                    <h2 className="flex items-center text-blue-500 gap-2 my-5">
                      <TbTag />
                      <span className="text-3xl font-semibold text-white">
                        Genres
                      </span>
                    </h2>
                    <ul className="flex gap-2 text-sm">
                      {anime?.genres.map((el) => {
                        return (
                          <div
                            key={el}
                            className="bg-black/30 px-5 py-1 rounded-3xl border border-gray-600 transition duration-700 hover:border-blue-400 hover:bg-blue-500/20"
                          >
                            {el}
                          </div>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === "seasons" && (
                <p className="mt-8 text-3xl font-semibold">
                  {"We don't have resources yet. :)"}
                </p>
              )}
            </div>
          </article>
        </div>
        {anime && <GenreRecommendations genres={anime?.genres || []} />}
      </div>
    </section>
  );
}
