"use client";

import AskUserNameModal from "@/app/components/modals/AskUserNameModal";
import RoomHeader from "@/app/components/RoomHeader";
import RoomName from "@/app/components/RoomName";
import VideoContainer from "@/app/components/VideoContainer";
import { SatoshiFont } from "@/app/fonts";
import { checkRoomExists, getSocket } from "@/app/lib/socket";
import { CheckRoomExistsResponse, RoomData } from "@/app/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomPage() {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
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

    socket.on("room-state-update", (roomData: RoomData) => {
      setRoomData(roomData);
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

      <RoomName roomName={roomData?.roomName} />

      <VideoContainer roomData={roomData as RoomData} />
    </div>
  );
}
