"use client";

import { addOrUpdateHistory } from "@/app/actions/history";
import { useEffect, useRef } from "react";

export function useVideoProgress(animeInfo, user) {
  const saveTimer = useRef(null);
  const saveLocal = (progress) => {
    if (!animeInfo?.id) return;
    const allData = JSON.parse(localStorage.getItem("progress") || "{}");

    allData[animeInfo?.id] = {
      animeInfo: {
        id: animeInfo?.id,
        coverImage: animeInfo?.coverImage?.extraLarge,
        format: animeInfo?.format,
        year: animeInfo?.startDate?.year,
        title: animeInfo?.title?.english || animeInfo?.title?.romaji,
      },
      lastWatched: new Date().toISOString(),
      progress,
    };

    localStorage.setItem("progress", JSON.stringify(allData));
  };

  const syncToDB = async () => {
    if (!user) return;
    const allData = JSON.parse(localStorage.getItem("progress") || "{}");
    const animeData = allData[animeInfo.id];
    if (animeData) {
      await addOrUpdateHistory(animeData, user.email);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // if (!animeInfo || !user?.email) return;

      const data = JSON.stringify({
        animeInfo: {
          id: animeInfo?.id,
          coverImage: animeInfo?.coverImage?.extraLarge,
          format: animeInfo?.format,
          year: animeInfo?.startDate?.year,
          title: animeInfo?.title?.english || animeInfo?.title?.romaji,
        },
        email: user?.email,
      });
      const blob = new Blob([data], { type: "application/json" });
      navigator.sendBeacon("/api/history/save", blob);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [animeInfo, user]);

  return { saveLocal, syncToDB };
}
