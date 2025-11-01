"use client";
import { useState, useEffect, useRef } from "react";
import { MdLocalMovies } from "react-icons/md";
import { fetchAniList } from "../_lib/fetchAniList";
import useInfiniteScroll from "../_hooks/useInfiniteScroll";
import AnimeCard from "./AnimeCard";
import { debounce } from "../_utils/debounce";
import { HashLoader } from "react-spinners";

export default function AnimesList({ query, filters }) {
  const pageRef = useRef(0);
  const totalRef = useRef(0);
  const [animeList, setAnimeList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const sort = filters?.sort_by || undefined;
  const format = filters?.format || undefined;
  const status = filters?.status || undefined;
  const search = filters?.search || undefined;
  const genres = filters?.genres || undefined;

  const loadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = pageRef.current + 1;
      const data = await fetchAniList({
        query,
        variables: {
          page: nextPage,
          perPage: 50,
          ...(sort && { sort: [sort] }),
          ...(format && { format }),
          ...(status && { status }),
          ...(search && { search }),
          ...(genres && { genres }),
        },
      });

      setAnimeList((prev) => [...prev, ...data.Page.media]);
      totalRef.current = data.Page.pageInfo.total;
      setHasMore(data.Page.pageInfo.hasNextPage);
      pageRef.current = nextPage;
    } catch (e) {
      console.error("Failed to fetch more anime:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Reset before triggering new load
    pageRef.current = 0;
    totalRef.current = 0;
    setAnimeList([]);

    // Small delay to allow state to flush
    const timer = setTimeout(() => {
      loadMore(); // only trigger once reset is fully complete
    }, 50); // even 50ms is enough

    return () => clearTimeout(timer); // cleanup
  }, [query, JSON.stringify(filters)]);

  // Hook to load more on scroll
  const debouncedLoadMore = useRef(debounce(loadMore, 700)).current;
  useInfiniteScroll(debouncedLoadMore, hasMore);
  return (
    <>
      <div className="flex justify-between py-8 text-base md:text-xl items-center">
        <h2 className="font-bold">All Results</h2>
        <p className="text-gray-400 max-sm:text-sm">
          {totalRef.current} results found
        </p>
      </div>
      {animeList.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {animeList.map((anime) => (
              <div
                key={anime.id}
                className="overflow-hidden h-40 sm:h-56 md:h-64 lg:h-[35vh] max-h-72 rounded-2xl"
              >
                <AnimeCard anime={anime} />
              </div>
            ))}
          </div>
          {isLoading && (
            <div className="flex justify-center py-16">
              <HashLoader size={24} color="#60A5FA" />
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] bg-black/30 border border-gray-600 rounded-2xl flex flex-col items-center justify-center gap-2 max-h-96 p-4 md:p-4">
          <span className="text-blue-400/50 text-6xl">
            <MdLocalMovies />
          </span>
          <h2 className="font-bold text-2xl">No results found.</h2>
          <p className="text-gray-400 max-lg:text-center">
            No results match your current filter criteria. Try adjusting your
            filters, genres selection or search term.
          </p>
        </div>
      )}
    </>
  );
}
