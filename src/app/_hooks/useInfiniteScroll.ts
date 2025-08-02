import { useEffect } from "react";

/**
 * Hook for infinite scroll using window scroll position.
 * @param {Function} loadMore - function to call when near bottom.
 * @param {boolean} hasMore - if there are more pages to fetch.
 */
export default function useInfiniteScroll(loadMore, hasMore) {
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore) return;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      if (nearBottom) loadMore();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, hasMore]);
}
