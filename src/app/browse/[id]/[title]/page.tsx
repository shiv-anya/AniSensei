"use client";

import Controls from "@/app/_components/Controls";
import { useAuth } from "@/app/_context/AuthContext";
import { SEARCH_BY_ID } from "@/app/_graphql/queries";
import { useVideoProgress } from "@/app/_hooks/useVideoProgress";
import { fetchAniList } from "@/app/_lib/fetchAniList";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
import dynamic from "next/dynamic";
import screenfull from "screenfull";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

export default function VideoPlayer() {
  const { user } = useAuth();
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const params = useParams();
  const router = useRouter();
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [anime, setAnime] = useState(null);
  const { saveLocal, syncToDB } = useVideoProgress(anime, user);

  const [playerState, setPlayerState] = useState({
    playing: false,
    muted: true,
    volume: 0,
    prevVol: 0,
    playbackRate: 1,
    played: 0,
    seeking: false,
    buffer: false,
  });

  const playPauseHandler = () => {
    setPlayerState((prev) => ({ ...prev, playing: !prev.playing }));
  };

  const mutedHandler = () => {
    if (playerState.muted)
      setPlayerState((prev) => ({
        ...prev,
        muted: !prev.muted,
        volume: playerState.prevVol,
      }));
    else setPlayerState((prev) => ({ ...prev, muted: !prev.muted, volume: 0 }));
  };

  const seekForward = () => {
    if (playerRef.current) {
      const videoLength = playerRef.current.getDuration();
      const time = playerRef.current.getCurrentTime() + 10;
      playerRef.current.seekTo(time >= videoLength ? videoLength : time);
    }
  };

  const seekBackward = () => {
    if (playerRef.current) {
      const time = playerRef.current.getCurrentTime() - 10;
      playerRef.current.seekTo(time > 0 ? time : 0);
    }
  };

  const progressHandler = (state) => {
    if (!anime?.id) return;
    saveLocal(state.played * 100);
    if (!playerState.seeking) {
      setPlayerState((prev) => ({ ...prev, played: state.played }));
    }
  };

  const seekHandler = (e) => {
    if (!progressLoaded) return;
    const newValue = parseFloat(e.target.value);
    setPlayerState((prev) => ({
      ...prev,
      played: newValue / 100,
      seeking: true,
    }));
  };

  const seekMouseUpHandler = (e) => {
    if (!progressLoaded) return;
    const newValue = parseFloat(e.target.value);
    saveLocal(newValue);
    setPlayerState((prev) => ({
      ...prev,
      played: newValue / 100,
      seeking: false,
    }));
    if (playerRef.current) {
      playerRef.current.seekTo(newValue / 100);
    }
  };

  const volumeSeekHandler = (e) => {
    const newValue = parseFloat(e.target.value);
    if (newValue / 100 === 0)
      setPlayerState((prev) => ({ ...prev, muted: true }));
    else setPlayerState((prev) => ({ ...prev, muted: false }));
    setPlayerState((prev) => ({
      ...prev,
      volume: newValue / 100,
      prevVol: newValue / 100,
    }));
  };

  const volumeSeekMouseUpHandler = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayerState((prev) => ({
      ...prev,
      volume: newValue / 100,
    }));
  };

  const playbackRateHandler = (val) => {
    setPlayerState((prev) => ({ ...prev, playbackRate: val }));
  };

  const toggleFullscreen = () => {
    if (screenfull.isEnabled && containerRef.current) {
      screenfull.toggle(containerRef.current);
    }
  };

  useEffect(() => {
    const id = params.id;
    const saved = JSON.parse(localStorage.getItem("progress") || "{}");
    const savedProgress = saved[id]?.progress ?? null;
    if (savedProgress !== null && playerRef.current) {
      playerRef.current.seekTo(savedProgress / 100);
      setPlayerState((prev) => ({ ...prev, played: savedProgress / 100 }));
    }
    setProgressLoaded(true);
    const getAnimeById = async () => {
      try {
        const decodedParamTitle = decodeURIComponent(params.title);
        const data = await fetchAniList({
          query: SEARCH_BY_ID,
          variables: { id },
        });
        const linkTitleEqualToTitle =
          decodedParamTitle?.split("-").join(" ") ===
          data?.Media?.title?.english.toLowerCase();
        setAnime(data.Media);
        if (!linkTitleEqualToTitle) {
          router.replace("/404");
        }
      } catch (e) {
        router.replace("/404");
      }
    };
    if (!progressLoaded) getAnimeById();
  }, [anime]);

  return (
    <section className="h-screen w-full bg-black" ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={`http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`}
        controls={false}
        height="100%"
        width="100%"
        playing={playerState.playing}
        muted={playerState.muted}
        playbackRate={playerState.playbackRate}
        onProgress={progressHandler}
        onPause={() => syncToDB()}
        onBuffer={() => setPlayerState({ ...playerState, buffer: true })}
        onBufferEnd={() => setPlayerState({ ...playerState, buffer: false })}
      />
      <Controls
        heading={anime?.title?.english || anime?.title?.romaji}
        playing={playerState.playing}
        muted={playerState.muted}
        onPlayPause={playPauseHandler}
        onMuteHandler={mutedHandler}
        onSeekForward={seekForward}
        onSeekBackward={seekBackward}
        played={playerState.played}
        onSeeking={seekHandler}
        onSeekingMouseUp={seekMouseUpHandler}
        buffer={playerState.buffer}
        volume={playerState.volume}
        onSeekingVolume={volumeSeekHandler}
        onSeekingVolumeUp={volumeSeekMouseUpHandler}
        onplaybackRateChange={playbackRateHandler}
        toggleFullscreen={toggleFullscreen}
      />
    </section>
  );
}
