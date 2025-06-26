import { MdOutlineLocalMovies } from "react-icons/md";

export default function AnimeCard({ anime }) {
  return (
    <div className="h-full rounded-2xl relative group">
      <div
        className="h-full rounded-2xl absolute left-0 right-0 bg-cover bg-center bg-no-repeat group-hover:scale-105 transition duration-700"
        style={{ backgroundImage: `url(/assets/poster.jpg)` }}
      ></div>
      <div className="h-full w-full relative top-0 right-0 bg-gradient-to-b from-black/80 via-transparent via-50% to-black/80 to-98% rounded-2xl flex flex-col justify-between p-3 hover:scale-100">
        <div className="text-semibold text-xs flex justify-between">
          <p className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm p-1 rounded-xl flex gap-1 items-center">
            <span className="text-lg text-blue-500">
              <MdOutlineLocalMovies />
            </span>
            {anime.type}
          </p>
          <p className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm p-1 rounded-xl">
            {anime.year}
          </p>
        </div>
        <div>
          <p>{anime.title}</p>
        </div>
      </div>
    </div>
  );
}
