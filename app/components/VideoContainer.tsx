"use client";

import { useEffect, useRef, useState } from "react";

import Loader from "./Loader";
import { SatoshiFont } from "../fonts";
import OptionTabs from "./OptionTabs";
import loadYoutubeIframeAPI from "../lib/youtube";
import { extractYouTubeVideoId } from "../lib/utils";
import { RoomData } from "../lib/types";

interface VideoContainerProps {
  roomData: RoomData;
}
export default function VideoContainer({ roomData }: VideoContainerProps) {
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingParticipants, setLoadingParticipants] = useState(true);

  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);
  const [videoId, setVideoId] = useState<string>("Csy6Vd33cYI");

  const participants = roomData?.members.map((member) => member.username);
  console.log(participants);

  useEffect(() => {
    if (roomData?.members.length > 0) {
      setLoadingParticipants(false);
    }
  }, [roomData?.members]);

  function handleVideoIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const videoId = extractYouTubeVideoId(e.target.value);

    if (videoId) {
      setVideoId(videoId);
      playerRef.current.loadVideoById(videoId);
    }
  }

  useEffect(() => {
    async function setupPlayer() {
      if (initializedRef.current) return;

      await loadYoutubeIframeAPI();

      playerRef.current = new window.YT.Player("video-container", {
        videoId: videoId,
        playerVars: {
          controls: 1,
          rel: 0,
        },
        events: {
          onReady: () => setLoading(false),
        },
      });

      initializedRef.current = true;

      // Logs
      console.log("YouTube player initialized with video ID:", videoId);
    }

    setupPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;

        // Logs
        console.log("YouTube player destroyed.");
      }
    };
  }, []);

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
        loadingParticipants={loadingParticipants}
        participants={participants ?? []}
      />
    </div>
  );
}
