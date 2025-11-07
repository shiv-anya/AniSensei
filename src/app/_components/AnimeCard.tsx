import Image from "next/image";
import Link from "next/link";
import { MdOutlineLocalMovies } from "react-icons/md";

export default function AnimeCard({ anime }) {
  return (
    <Link href={`/browse/${anime?.id}`} className="bg-black">
      <div className="h-full rounded-2xl relative group bg-black">
        <Image
          src={anime.coverImage?.extraLarge || anime?.coverImage}
          alt={anime?.title?.english || anime?.title?.romaji || "Anime cover"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover rounded-2xl transition duration-700 group-hover:scale-105"
          priority
        />
        <div className="h-full w-full relative top-0 right-0 bg-gradient-to-b from-black/80 via-transparent via-50% to-black/80 to-98% rounded-2xl flex flex-col justify-between p-3 hover:scale-100">
          <div className="text-semibold text-xs flex justify-between">
            <p className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm p-1 rounded-xl flex gap-1 items-center">
              <span className="text-lg text-blue-500">
                <MdOutlineLocalMovies />
              </span>
              {anime.format}
            </p>
            {anime?.startDate?.year && (
              <p className="bg-gray-800/50 border border-gray-700 backdrop-blur-sm p-1 rounded-xl">
                {anime?.startDate?.year}
              </p>
            )}
          </div>
          <div>
            <p>
              {anime?.title?.english || anime?.title?.romaji || anime?.title}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
