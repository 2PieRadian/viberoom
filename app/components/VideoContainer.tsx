"use client";

import { useEffect, useRef, useState } from "react";

import Loader from "./Loader";
import { SatoshiFont } from "../fonts";
import OptionTabs from "./OptionTabs";
import loadYoutubeIframeAPI from "../lib/youtube";
import { RoomData } from "../lib/types";

interface VideoContainerProps {
  roomData: RoomData;
}

export default function VideoContainer({ roomData }: VideoContainerProps) {
  const [loading, setLoading] = useState(true);

  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    async function setupPlayer() {
      if (initializedRef.current) return;

      await loadYoutubeIframeAPI();

      playerRef.current = new window.YT.Player("video-container", {
        videoId: roomData?.videoId ?? "",
        playerVars: {
          controls: 1,
          rel: 0,
        },
        events: {
          onReady: () => setLoading(false),
        },
      });

      initializedRef.current = true;
    }

    setupPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
        initializedRef.current = false;
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(roomData?.videoId ?? "");
    }
  }, [roomData?.videoId]);

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
          className="w-full h-full [&>iframe]:w-full! [&>iframe]:h-full! relative"
        >
          {loading && <Loader />}
        </div>
      </div>

      <OptionTabs roomData={roomData} />
    </div>
  );
}
