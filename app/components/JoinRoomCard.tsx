"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { CheckRoomExistsResponse } from "../lib/types";

interface JoinRoomCardProps {
  socket: Socket | null;
}

export default function JoinRoomCard({ socket }: JoinRoomCardProps) {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("room-exists-response", ({ exists }: CheckRoomExistsResponse) => {
      if (!exists) {
        setError("Room not found. Please check the Room ID and try again.");
        return;
      }

      router.push(`/room/${roomId}`);
    });

    return () => {
      socket.off("room-exists-response");
    };
  }, [roomId, router, socket]);

  function handleJoin() {
    if (roomId.trim() === "") {
      setError("Room ID cannot be empty");
      return;
    }

    setError("");
    socket?.emit("check-room-exists", roomId);
  }

  return (
    <div className="max-w-[600px] w-full p-[25px] border border-room-card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleJoin();
        }}
      >
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex flex-col gap-[2px] w-full">
            <label
              htmlFor="roomId"
              className="text-base text-room-card-input-label"
            >
              Room Id
            </label>
            <input
              type="text"
              id="roomId"
              className="bg-room-card-input max-w-[600px] text-md w-full border border-room-card-input-border px-[15px] py-[8px]"
              placeholder="Enter room id here"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <div>{error && <p className="text-red-400">{error}</p>}</div>
        </div>

        <button
          type="submit"
          className="bg-intro-navbar max-w-[600px] w-full mt-[10px] py-[10px] text-center cursor-pointer text-md font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 active:scale-[0.98] transform"
        >
          <span>Join Room</span>
        </button>
      </form>
    </div>
  );
}
