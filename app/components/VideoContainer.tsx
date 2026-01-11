"use client";

import { useState } from "react";

import Loader from "./Loader";
import { SatoshiFont } from "../fonts";
import OptionTabs from "./OptionTabs";

interface VideoContainerProps {
  videoId: string;
  loading: boolean;
  setVideoId: (videoId: string) => void;
  handleVideoIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VideoContainer({
  videoId,
  loading,
  setVideoId,
  handleVideoIdChange,
}: VideoContainerProps) {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`${SatoshiFont.variable} w-full flex lg:flex-row flex-col gap-[5px] p-[5px]`}
      style={{ fontFamily: "var(--font-satoshi)" }}
    >
      {/* Video Player */}
      <div
        className="w-full lg:w-[70%] bg-[hsl(270,6%,7%)] border border-video-player-border"
        style={{ aspectRatio: "16 / 9" }}
      >
        <div
          id="video-container"
          className="w-full h-full [&>iframe]:!w-full [&>iframe]:!h-full relative"
        >
          {loading && <Loader />}
        </div>
      </div>

      <OptionTabs
        collapse={collapse}
        setCollapse={setCollapse}
        videoId={videoId}
        setVideoId={setVideoId}
        handleVideoIdChange={handleVideoIdChange}
      />
    </div>
  );
}
