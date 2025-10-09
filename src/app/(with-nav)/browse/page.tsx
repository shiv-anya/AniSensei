"use client";
import { useState } from "react";
import { IoFilter } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { ALL_ANIME_QUERY, FILTER_QUERY } from "../../_graphql/queries";
import AnimesList from "@/app/_components/AnimesList";
import Dropdown from "@/app/_components/Dropdown";

export default function Browse() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState({
    ["sort_by"]: searchParams.get("sort_by") || "",
    format: searchParams.get("format") || "",
    status: searchParams.get("status") || "",
  });
  const hasFilters = filters.sort_by || filters.format || filters.status;
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key); // remove from URL if cleared
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const [showFilter, setShowFilter] = useState(false);
  return (
    <section className="w-[80%] mx-auto pb-[55vh] max-w-screen-xl">
      <div className="relative top-32">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex gap-2 items-center text-blue-500 text-4xl font-bold">
              <span>
                <MdLocalMovies />
              </span>
              <h2>Browse</h2>
            </div>
            <p className="text-gray-400 mt-2">Watch cinematic masterpieces</p>
          </div>
          <div
            className="cursor-pointer bg-gray-900 px-6 py-2 rounded-xl flex gap-2 items-center"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <span>
              <IoFilter />
            </span>
            Filters{" "}
            <span
              className={`${
                showFilter
                  ? "rotate-180 transition duration-700"
                  : "rotate-360 transition duration-700"
              }`}
            >
              <FaChevronDown />
            </span>
          </div>
        </div>
        {showFilter && (
          <div
            className={`z-40 bg-black/30 border border-gray-600 rounded-2xl mt-5 backdrop-blur-sm sticky top-28 flex justify-between p-5`}
          >
            <div className="flex items-center gap-5">
              <Dropdown
                label="format"
                options={[
                  { name: "TV", value: "TV" },
                  { name: "TV Short", value: "TV_SHORT" },
                  { name: "movie", value: "MOVIE" },
                  { name: "ova", value: "OVA" },
                  { name: "ona", value: "ONA" },
                  { name: "special", value: "SPECIAL" },
                  { name: "music", value: "MUSIC" },
                ]}
                onChange={updateFilter}
                value={filters.format}
              />
              <Dropdown
                label="sort by"
                options={[
                  { name: "popularity", value: "POPULARITY_DESC" },
                  { name: "score", value: "SCORE_DESC" },
                  { name: "trending", value: "TRENDING_DESC" },
                  { name: "start date", value: "START_DATE_DESC" },
                  { name: "title", value: "TITLE_ROMAJI" },
                ]}
                onChange={updateFilter}
                value={filters.sort_by}
              />
              <Dropdown
                label="status"
                options={[
                  { name: "finished", value: "FINISHED" },
                  { name: "releasing", value: "RELEASING" },
                  { name: "not yet released", value: "NOT_YET_RELEASED" },
                  { name: "cancelled", value: "CANCELLED" },
                  { name: "hiatus", value: "HIATUS" },
                ]}
                onChange={updateFilter}
                value={filters.status}
              />
            </div>
            <div className="flex gap-5 items-center">
              <button
                className="cursor-pointer"
                onClick={() => {
                  setFilters({
                    format: "",
                    ["sort_by"]: "",
                    status: "",
                  });
                  router.push("/browse");
                }}
              >
                Clear All
              </button>
              <button
                className="cursor-pointer"
                onClick={() => setShowFilter(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <AnimesList
          query={hasFilters ? FILTER_QUERY : ALL_ANIME_QUERY}
          filters={hasFilters ? filters : undefined}
        />
      </div>
    </section>
  );
}
