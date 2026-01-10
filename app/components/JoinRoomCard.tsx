"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface JoinRoomCardProps {
  socket: Socket | null;
}

interface JoinRoomData {
  roomId: string;
  username: string;
}

export default function JoinRoomCard({ socket }: JoinRoomCardProps) {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!socket) return;

    socket.on("room-not-found", () => {
      setError("Room not found. Please check the Room ID and try again.");
    });

    return () => {
      socket.off("room-not-found");
    };
  }, []);

  function handleJoin() {
    if (roomId.trim() === "" || username.trim() === "") {
      setError("Fields cannot be empty");
      return;
    }

    setError("");

    socket?.emit("join-room", { roomId, username } as JoinRoomData);
  }

  return (
    <div className="max-w-[600px] w-full rounded-[10px] p-[25px] border-[1px] border-room-card">
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
            className="bg-room-card-input max-w-[600px] text-md w-full px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
            placeholder="Enter room id here"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-[2px] w-full">
          <label
            htmlFor="name"
            className="text-base text-room-card-input-label"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-room-card-input max-w-[600px] text-md w-full px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
            placeholder="Enter a name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>{error && <p className="text-red-400">{error}</p>}</div>
      </div>

      <div
        className="bg-intro-navbar max-w-[600px] text-md w-full rounded-[8px] mt-[10px] py-[10px] text-center cursor-pointer text-md"
        onClick={handleJoin}
      >
        Join Room
      </div>
    </div>
  );
}
