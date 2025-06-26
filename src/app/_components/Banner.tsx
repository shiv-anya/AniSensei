import { IoInformationCircleOutline } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineMovieFilter } from "react-icons/md";
import Link from "next/link";

export const Banner = ({ name, date, type, rating, about, img }) => {
  const words = about.split(" ");
  const first20 = words.slice(0, 20);
  const result = first20.join(" ");

  return (
    <div
      className={`h-full rounded-[2.5rem] flex bg-cover bg-no-repeat bg-center relative`}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="h-full rounded-[2.5rem] w-full bg-[rgba(0,0,0,0.8)] absolute top-0 left-0"></div>
      <div className="w-[60%] z-4 py-9 pl-12 flex flex-col justify-center">
        <div>
          <h2 className="text-6xl capitalize font-inter font-bold">{name}</h2>
          <div className="w-[30%] rounded-full bg-gradient-to-r from-blue-500 to-transparent h-2 mt-2"></div>
        </div>
        <div className="flex text-sm gap-3 my-5">
          <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
            <span className="text-blue-500 text-base">
              <CiCalendar />
            </span>
            {date}
          </div>
          <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
            <span className="text-blue-500 text-base">
              <MdOutlineMovieFilter />
            </span>
            {type}
          </div>
          <div className="border border-gray-600 bg-gray-800/50 backdrop-blur-sm px-3 py-1 rounded-full flex gap-2 items-center font-semibold">
            <span className="text-yellow-500 text-base">
              <FaStar />
            </span>
            {rating}
          </div>
        </div>
        <div className="bg-[rgba(0,0,0,0.3)] backdrop-blur-sm py-3 px-5 rounded-xl border border-gray-600 text-lg">
          {result + "... "}
          <Link href={"/"} className="text-blue-500">
            Read more.
          </Link>
        </div>
        <div className="w-full my-5 flex gap-4">
          <button
            className="relative bg-blue-500 w-[30%] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-search shadow-blue-500/40 overflow-hidden hover:scale-110 duration-700 before:content-[''] before:absolute before:top-0 before:left-0 before:w-[70%] before:h-full before:bg-gradient-to-r before:from-white/50 before:to-transparent before:translate-x-[-100%] before:-skew-x-12 hover:before:translate-x-[200%] 
  before:transition-transform before:duration-700 before:ease-in"
          >
            <span className="text-xl">
              <IoPlayCircleOutline />
            </span>
            Watch Now
          </button>
          <button className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm w-[30%] py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:scale-110 hover:bg-gray-600/50 duration-700">
            <span className="text-xl">
              <IoInformationCircleOutline />
            </span>
            More Details
          </button>
        </div>
      </div>
      <div className="w-[40%] h-full z-4 overflow-hidden">
        <div
          className={`w-[75%] mx-auto h-full bg-cover bg-no-repeat bg-center shadow-poster shadow-blue-400/40 hover:scale-105 transition duration-700`}
          style={{ backgroundImage: `url(${img})` }}
        >
          <div className="h-full w-full transition duration-700 hover:bg-gradient-to-t hover:from-black hover:from-0% hover:to-transparent to-60%"></div>
        </div>
      </div>
    </div>
  );
};
