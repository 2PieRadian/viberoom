"use client";

import Loader from "@/app/components/Loader";
import RoomHeader from "@/app/components/RoomHeader";
import VideoContainer from "@/app/components/VideoContainer";
import { SatoshiFont } from "@/app/fonts";
import { checkRoomExists, getSocket, joinRoom } from "@/app/lib/socket";
import { CheckRoomExistsResponse } from "@/app/lib/types";
import { extractYouTubeVideoId } from "@/app/lib/utils";
import loadYoutubeIframeAPI from "@/app/lib/youtube";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AskUserNameModal({
  username,
  setUsername,
  setAskUserNameModalOpen,
}: {
  username: string;
  setUsername: (username: string) => void;
  setAskUserNameModalOpen: (open: boolean) => void;
}) {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="flex flex-col gap-[10px] bg-black p-[20px] rounded-[10px]">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter a name"
          className="bg-black text-white border-[1px] border-white rounded-[5px] p-[5px] w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" onClick={() => setAskUserNameModalOpen(false)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [videoId, setVideoId] = useState<string>("Csy6Vd33cYI");
  const [loading, setLoading] = useState(true);
  const [roomExists, setRoomExists] = useState(false);

  const playerRef = useRef<any>(null);
  const initializedRef = useRef(false);

  const [username, setUsername] = useState("");
  const [askUserNameModalOpen, setAskUserNameModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();
    checkRoomExists(roomId);

    socket.on("room-exists-response", ({ exists }: CheckRoomExistsResponse) => {
      if (!exists) {
        router.push("/room-not-found");
        return;
      }

      console.log("Room exists:", exists);
      setRoomExists(exists);
    });

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
    joinRoom({ roomId, username });

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

  if (!roomExists) {
    return (
      <div className="absolute inset-0 flex flex-col gap-[15px] items-center justify-center bg-[hsl(270,6%,7%)]">
        <div className="w-10 h-10 border-2 border-[hsl(267,7%,31%)] border-t-[hsl(263,48%,55%)] rounded-full animate-spin" />

        <h1
          className={`${SatoshiFont.variable} text-xl mb-[35px] text-[hsl(207,18%,90%)]`}
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          Checking if room exists
        </h1>
      </div>
    );
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
