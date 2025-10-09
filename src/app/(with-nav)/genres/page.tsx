"use client";
import { useEffect, useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { GENRE_RECOMMENDATIONS } from "../../_graphql/queries";
import AnimesList from "@/app/_components/AnimesList";

const AniListGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Slice of Life",
  "Magic",
  "Supernatural",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Sports",
  "Harem",
  "Hentai",
  "Isekai",
  "Historical",
  "Military",
  "Music",
  "Mecha",
  "Vampire",
  "Horror",
  "Thriller",
  "Shounen",
  "Shoujo",
  "Josei",
  "Seinen",
  "Sport",
  "Super Power",
  "Magical Girl",
  "Martial Arts",
  "Demons",
  "School",
  "Game",
  "Police",
  "Space",
  "Drama",
  "Yuri",
  "Yaoi",
  "Fantasy",
  "Ecchi",
  "Gender Bender",
];

export default function Genres() {
  const [genresArray, setGenresArray] = useState([]);
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
  const toggleGenreSelect = (name) => {
    const idx = genresArray.indexOf(name);
    if (idx === -1) {
      setGenresArray((prev) => [...prev, name]);
    } else {
      const tempArray = [...genresArray].filter((el) => el !== name);
      setGenresArray(tempArray);
    }
  };
  const genres = useDebounce(genresArray, 1000);
  return (
    <section className="h-auto min-h-screen w-[80%] mx-auto py-40 max-w-screen-xl">
      <div>
        <div>
          <div className="flex gap-2 items-center text-blue-500 text-4xl font-bold">
            <span>
              <HiOutlineSparkles />
            </span>
            <h2>Genres</h2>
          </div>
          <p className="text-gray-400 mt-2">Find Shows That Match Your Vibe</p>
        </div>
        <div className="w-full">
          <ul className="p-4 my-8 rounded-xl flex flex-wrap  gap-2 justify-center">
            {AniListGenres.map((el) => (
              <li key={el}>
                <button
                  className={`bg-black/20 rounded-3xl hover:bg-black/50 px-5 py-2 transition duration ${
                    genresArray.includes(el)
                      ? "bg-blue-500/50 hover:bg-blue-500 outline-1 outline-blue-400 outline-offset-2"
                      : ""
                  }`}
                  onClick={() => toggleGenreSelect(el)}
                >
                  {el}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <AnimesList
            query={GENRE_RECOMMENDATIONS}
            filters={{ genres: genresArray }}
          />
        </div>
      </div>
    </section>
  );
}
