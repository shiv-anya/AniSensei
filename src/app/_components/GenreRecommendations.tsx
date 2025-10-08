"use client";
import { useState, useEffect } from "react";
import { RiStarSmileLine } from "react-icons/ri";
import ListCarousel from "./ListCarousel";
import { GENRE_RECOMMENDATIONS } from "../_graphql/queries";
import { fetchAniList } from "../_lib/fetchAniList";

export default function GenreRecommendations({ genres }) {
  const [recommendedAnimes, setRecommendedAnimes] = useState([]);
  const loadAnimes = async () => {
    const data = await fetchAniList({
      query: GENRE_RECOMMENDATIONS,
      variables: { genres },
    });

    setRecommendedAnimes(data.Page.media);
  };
  useEffect(() => {
    loadAnimes();
  }, []);
  return (
    <section className="pt-16">
      <ListCarousel
        animes={recommendedAnimes}
        title={"you may also like"}
        icon={<RiStarSmileLine />}
        height={"40"}
        maxH={280}
        itemsCountPerPage={7}
      />
    </section>
  );
}
