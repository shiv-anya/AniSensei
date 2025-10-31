import { IoPlayCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosTrendingUp } from "react-icons/io";
import { MdOutlineLocalMovies } from "react-icons/md";
import { PiPopcorn } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { fetchAniList } from "../_lib/fetchAniList";
import ListCarousel from "../_components/ListCarousel";
import BannerCarousel from "../_components/BannerCarousel";

import {
  BANNER_ANIMES_QUERY,
  COMING_SOON_ANIMES_QUERY,
  NEW_RELEASED_ANIMES_QUERY,
  POPULAR_ANIME_SHOWS_QUERY,
  TOP_RATED_ANIMES,
  TRENDING_ANIMES_QUERY,
  WHATS_POPULAR_QUERY,
} from "../_graphql/queries";

export default async function Home() {
  const bannerAnimes = await fetchAniList({ query: BANNER_ANIMES_QUERY });
  const finalBannerAnimes = bannerAnimes.Page.media
    .filter((anime) => anime.title.english?.length < 15)
    .slice(0, 5);

  const trendingAnimes = await fetchAniList({ query: TRENDING_ANIMES_QUERY });

  const newReleasedAnimes = await fetchAniList({
    query: NEW_RELEASED_ANIMES_QUERY,
  });

  const popularShows = await fetchAniList({ query: POPULAR_ANIME_SHOWS_QUERY });

  const comingSoonAnimes = await fetchAniList({
    query: COMING_SOON_ANIMES_QUERY,
  });

  const topRatedAnimes = await fetchAniList({ query: TOP_RATED_ANIMES });

  const whatsPopularAnimes = await fetchAniList({ query: WHATS_POPULAR_QUERY });

  return (
    <div className="w-[90%] md:w-[80%] mx-auto pb-[10vh] max-w-screen-xl">
      <BannerCarousel movies={finalBannerAnimes} />
      <ListCarousel
        animes={trendingAnimes.Page.media}
        title={"trending now"}
        icon={<IoIosTrendingUp />}
        height={"80"}
        itemsCountPerPage={4}
        maxH={600}
      />
      <ListCarousel
        animes={newReleasedAnimes.Page.media}
        title={"new releases"}
        icon={<IoAddCircleOutline />}
        height={"50"}
        itemsCountPerPage={2}
        maxH={350}
      />
      <ListCarousel
        animes={popularShows.Page.media}
        title={"popular shows"}
        icon={<MdOutlineLocalMovies />}
        height={"80"}
        itemsCountPerPage={4}
        maxH={600}
      />
      <ListCarousel
        animes={comingSoonAnimes.Page.media}
        title={"coming soon"}
        icon={<PiPopcorn />}
        height={"80"}
        itemsCountPerPage={4}
        maxH={600}
      />
      <ListCarousel
        animes={topRatedAnimes.Page.media}
        title={"top rated shows"}
        icon={<FaRegStar />}
        height={"80"}
        itemsCountPerPage={4}
        maxH={600}
      />
      <ListCarousel
        animes={whatsPopularAnimes.Page.media}
        title={"what's popular"}
        icon={<MdOutlineLocalFireDepartment />}
        height={"35"}
        itemsCountPerPage={3}
        maxH={250}
      />
    </div>
  );
}
