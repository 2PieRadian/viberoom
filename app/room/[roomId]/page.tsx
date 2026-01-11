"use client";

import AskUserNameModal from "@/app/components/modals/AskUserNameModal";
import RoomHeader from "@/app/components/RoomHeader";
import RoomName from "@/app/components/RoomName";
import VideoContainer from "@/app/components/VideoContainer";
import { SatoshiFont } from "@/app/fonts";
import { checkRoomExists, getSocket } from "@/app/lib/socket";
import {
  CheckRoomExistsResponse,
  Interaction,
  RoomData,
} from "@/app/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RoomPage() {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const [roomExists, setRoomExists] = useState(false);
  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();

    socket.on(
      "room-exists-response",
      ({ roomId, exists }: CheckRoomExistsResponse) => {
        if (!exists) {
          router.push("/room-not-found");
          return;
        }

        setRoomExists(exists);
      }
    );

    socket.on("join-room-success", (roomState: RoomData) => {
      setHasJoinedRoom(true);
      setRoomData(roomState);
    });

    // When someone updates the video id, joins the room, or leaves the room, update the room data
    socket.on("room-state-update", (roomState: RoomData) => {
      console.log("Room state updated:", roomState);
      setRoomData(roomState);
    });

    // When someone plays, pauses, or seeks the video, update the interactions
    socket.on(
      "interaction-update",
      (interaction: Interaction, roomId: string) => {
        setInteractions((prevInteractions) => [
          ...prevInteractions,
          interaction,
        ]);
        console.log("Interaction updated:", interaction);
      }
    );

    checkRoomExists(roomId);
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
    return <AskUserNameModal roomId={roomId as string} />;
  }

  return (
    <div className="max-w-[1700px] w-full mx-auto">
      <RoomHeader roomId={roomId} />

      <RoomName roomName={roomData?.roomName} />

      <VideoContainer
        roomData={roomData as RoomData}
        interactions={interactions}
      />
    </div>
  );
}
