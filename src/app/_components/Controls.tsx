"use client";
import { useState } from "react";
import { BsFullscreen, BsVolumeMuteFill } from "react-icons/bs";
import { IoIosSkipForward, IoMdPause, IoMdPlay } from "react-icons/io";
import {
  MdFullscreen,
  MdFullscreenExit,
  MdOutlineForward10,
  MdOutlineReplay10,
  MdVolumeUp,
} from "react-icons/md";
import { HashLoader } from "react-spinners";

export default function Controls({
  heading,
  playing,
  onPlayPause,
  muted,
  played,
  onMuteHandler,
  onSeekForward,
  onSeekBackward,
  onSeeking,
  onSeekingMouseUp,
  volume,
  onSeekingVolume,
  onSeekingVolumeUp,
  buffer,
  onplaybackRateChange,
  toggleFullscreen,
}) {
  const [isFullscreen, setIsFullScreen] = useState(false);
  const playbackRates = [0.5, 1, 1.25, 1.5, 2];
  const [idx, setIdx] = useState(1);
  const handlePlaybackRateChange = () => {
    const nextIdx = (idx + 1) % playbackRates.length === 0 ? 0 : idx + 1;
    setIdx(nextIdx);
    onplaybackRateChange(playbackRates[nextIdx]);
  };
  return (
    <div
      className={`w-full h-full ${
        playing ? "bg-transparent" : "bg-black/60"
      } absolute top-0 left-0 z-10 p-8 flex flex-col items-center justify-between`}
    >
      <h2 className="text-3xl font-semibold capitalize">
        {heading?.split("-").join(" ")}
      </h2>
      {buffer && (
        <HashLoader
          color="#60A5FA
"
        />
      )}
      {!playing && (
        <div>
          <div className="text-4xl flex gap-10">
            <button className="cursor-pointer" onClick={onSeekBackward}>
              <MdOutlineReplay10 />
            </button>
            <button className="cursor-pointer" onClick={onPlayPause}>
              {playing ? <IoMdPause /> : <IoMdPlay />}
            </button>
            <button className="cursor-pointer" onClick={onSeekForward}>
              <MdOutlineForward10 />
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full">
          <input
            type="range"
            min={0}
            max={100}
            step="any"
            value={played ? played * 100 : 0}
            onChange={onSeeking}
            onMouseUp={onSeekingMouseUp}
            onTouchStart={onSeekingMouseUp}
            onTouchEnd={onSeekingMouseUp}
            className="
    w-full h-2 bg-gray-700/60 rounded-lg appearance-none cursor-pointer
    accent-blue-500
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3
    [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-blue-500
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:border-0

    [&::-moz-range-thumb]:appearance-none
    [&::-moz-range-thumb]:w-3
    [&::-moz-range-thumb]:h-3
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-blue-500
    [&::-moz-range-thumb]:border-0
    [&::-moz-range-thumb]:cursor-pointer
  "
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 text-2xl items-center">
            {playing && (
              <button onClick={onPlayPause} className="cursor-pointer">
                {playing ? <IoMdPause /> : <IoMdPlay />}
              </button>
            )}
            <div className="flex items-center justify-center gap-2">
              <button
                className="cursor-pointer flex items-center"
                onClick={onMuteHandler}
              >
                {muted ? <BsVolumeMuteFill /> : <MdVolumeUp />}
              </button>
              <div className="w-full flex items-center">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step="any"
                  value={volume ? volume * 100 : 0}
                  onChange={onSeekingVolume}
                  onMouseUp={onSeekingVolumeUp}
                  className="
    w-[80%] h-[6px] bg-gray-700/60 rounded-lg appearance-none cursor-pointer
    accent-blue-500
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-[10px]
    [&::-webkit-slider-thumb]:h-[10px]
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-blue-500
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-webkit-slider-thumb]:border-0

    [&::-moz-range-thumb]:appearance-none
    [&::-moz-range-thumb]:w-3
    [&::-moz-range-thumb]:h-3
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-blue-500
    [&::-moz-range-thumb]:border-0
    [&::-moz-range-thumb]:cursor-pointer
  "
                />
              </div>
            </div>
          </div>
          <div className="flex text-xl items-center">
            <div
              className="cursor-pointer px-5"
              onClick={handlePlaybackRateChange}
            >
              {playbackRates[idx] + "x"}
            </div>
            <div
              onClick={() => {
                toggleFullscreen();
                setIsFullScreen((prev) => !prev);
              }}
              className="text-2xl cursor-pointer"
            >
              {isFullscreen ? <MdFullscreenExit /> : <MdFullscreen />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
