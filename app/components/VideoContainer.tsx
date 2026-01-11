"use client";

import { useEffect, useRef, useState } from "react";

import Loader from "./Loader";
import { SatoshiFont } from "../fonts";
import OptionTabs from "./OptionTabs";
import loadYoutubeIframeAPI from "../lib/youtube";
import { Interaction, RoomData } from "../lib/types";
import { getSocket } from "../lib/socket";

interface VideoContainerProps {
  roomData: RoomData;
  interactions: Interaction[];
}

export default function VideoContainer({
  roomData,
  interactions,
}: VideoContainerProps) {
  const [loading, setLoading] = useState(true);

  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);
  const socket = getSocket();

  const username = roomData.members.find(
    (member) => member.socketId === socket.id
  )?.username;

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
          onReady: () => {
            setLoading(false);

            if (roomData.isPlaying) {
              playerRef.current.playVideo();
            }
          },
          onStateChange: (event: any) => {
            const playerState = event.data;

            if (playerState === window.YT.PlayerState.PLAYING) {
              socket.emit("play-video", {
                roomId: roomData.roomId,
                currentTime: playerRef.current.getCurrentTime(),
              });

              socket.emit("interaction-update", {
                type: "play",
                time: playerRef.current.getCurrentTime(),
                username: username,
              });
            }

            if (playerState === window.YT.PlayerState.PAUSED) {
              socket.emit("pause-video", {
                roomId: roomData.roomId,
                currentTime: playerRef.current.getCurrentTime(),
              });

              socket.emit("interaction-update", {
                type: "pause",
                time: playerRef.current.getCurrentTime(),
                username: username,
              });
            }
          },
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

  // If the videoId changes, load the new video
  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.loadVideoById(roomData?.videoId ?? "");
    }
  }, [roomData?.videoId]);

  // If the video is playing or paused, update the room data
  useEffect(() => {
    if (!playerRef.current) return;

    if (roomData.isPlaying) {
      // playerRef.current.seekTo(roomData.currentTime);
      playerRef.current.playVideo();
    } else {
      // playerRef.current.seekTo(roomData.currentTime);
      playerRef.current.pauseVideo();
    }
  }, [roomData.isPlaying]);

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

      <OptionTabs roomData={roomData} interactions={interactions} />
    </div>
  );
}
