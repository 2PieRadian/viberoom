"use client";

import RoomHeader from "@/app/components/RoomHeader";
import VideoContainer from "@/app/components/VideoContainer";
import { SatoshiFont } from "@/app/fonts";
import { checkRoomExists, getSocket, joinRoom } from "@/app/lib/socket";
import { CheckRoomExistsResponse } from "@/app/lib/types";
import { extractYouTubeVideoId } from "@/app/lib/utils";
import loadYoutubeIframeAPI from "@/app/lib/youtube";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

function AskUserNameModal({
  username,
  setUsername,
  setAskUserNameModalOpen,
  roomId,
}: {
  roomId: string;
  username: string;
  setUsername: (username: string) => void;
  setAskUserNameModalOpen: (open: boolean) => void;
}) {
  const [error, setError] = useState("");

  function handleSubmitUserName() {
    if (username.trim() === "") {
      setError("Username cannot be empty");
      return;
    }

    setError("");

    setAskUserNameModalOpen(false);
    joinRoom({ roomId, username });
  }
  return (
    <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
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
        <div
          className="bg-intro-navbar max-w-[600px] text-md w-full rounded-[8px] mt-[10px] py-[10px] text-center cursor-pointer text-md"
          onClick={handleSubmitUserName}
        >
          Submit
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomExists, setRoomExists] = useState(false);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  const [username, setUsername] = useState("");
  const [askUserNameModalOpen, setAskUserNameModalOpen] = useState(true);
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

    socket.on("join-room-success", () => {
      setHasJoinedRoom(true);
    });
  }, []);

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

  if (!hasJoinedRoom) {
    return (
      <AskUserNameModal
        roomId={roomId as string}
        username={username}
        setUsername={setUsername}
        setAskUserNameModalOpen={setAskUserNameModalOpen}
      />
    );
  }

  return (
    <div className="max-w-[1700px] w-full mx-auto">
      <RoomHeader roomId={roomId} />

      <VideoContainer />

      <Link href={`/`}>Change</Link>
    </div>
  );
}
