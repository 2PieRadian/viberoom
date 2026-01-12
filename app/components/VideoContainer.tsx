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

  const lastTimeRef = useRef<number>(0);
  const isApplyingRemoteRef = useRef(false);

  const username = roomData.members.find(
    (member) => member.socketId === socket.id
  )?.username;

  // Emit the current time to the server every 500ms
  useEffect(() => {
    if (!playerRef.current) return;

    const interval = setInterval(() => {
      if (
        !playerRef.current ||
        typeof playerRef.current.getCurrentTime !== "function"
      )
        return;

      // If we are already applying the remote time, don't do anything
      if (isApplyingRemoteRef.current) return;

      const currentTime = playerRef.current.getCurrentTime();
      const timeDiff = currentTime - lastTimeRef.current;

      // If the time difference is greater than 1 second, emit the current time to the server
      if (timeDiff > 1) {
        socket.emit("seek-video", {
          roomId: roomData.roomId,
          currentTime: currentTime,
          username: username,
        });

        lastTimeRef.current = currentTime;
      }
      console.log("Time difference:", timeDiff);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // If the remote current time changes, apply it to the player
  useEffect(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;

    const localTime = player.getCurrentTime();
    if (typeof localTime !== "number") return;

    const timeDiff = localTime - roomData.currentTime;

    if (timeDiff > 1) {
      // So that the seeker cannot emit the current time to the server again
      isApplyingRemoteRef.current = true;
      player.seekTo(roomData.currentTime);
      lastTimeRef.current = roomData.currentTime;

      // Allow local events again shortly
      setTimeout(() => {
        isApplyingRemoteRef.current = false;
      }, 800);
    }
  }, [roomData.currentTime]);

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
