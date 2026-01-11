"use client";

import RoomHeader from "@/app/components/RoomHeader";
import VideoContainer from "@/app/components/VideoContainer";
import { extractYouTubeVideoId } from "@/app/lib/utils";
import loadYoutubeIframeAPI from "@/app/lib/youtube";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [videoId, setVideoId] = useState<string>("Csy6Vd33cYI");
  const [loading, setLoading] = useState(true);

  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

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

  function handleVideoIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    const videoId = extractYouTubeVideoId(e.target.value);

    if (videoId) {
      setVideoId(videoId);
      playerRef.current.loadVideoById(videoId);
    }
  }

  return (
    <div className="max-w-[1700px] w-full mx-auto">
      <RoomHeader roomId={roomId} />

      <VideoContainer
        videoId={videoId}
        loading={loading}
        setVideoId={setVideoId}
        handleVideoIdChange={handleVideoIdChange}
      />

      <Link href={`/`}>Change</Link>
    </div>
  );
}
