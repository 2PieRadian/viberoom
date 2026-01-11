"use client";

import { useEffect, useRef } from "react";
import loadYoutubeIframeAPI from "../lib/youtube";

export default function VideoContainer({ videoId }: { videoId: string }) {
  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    async function setupPlayer() {
      if (initializedRef.current) return;

      await loadYoutubeIframeAPI();

      playerRef.current = new window.YT.Player("video-container", {
        height: "400",
        width: "640",
        videoId: videoId,
        playerVars: {
          controls: 1,
          rel: 0,
        },
        events: {
          onReady: () => console.log("YT ready"),
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
      className="w-full h-[400px] bg-[hsl(270,6%,7%)]"
      id="video-container"
    ></div>
  );
}
