"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

interface CreateRoomCardProps {
  socket: Socket | null;
}

interface CreateRoomData {
  roomName: string;
}

export default function CreateRoomCard({ socket }: CreateRoomCardProps) {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on("create-room-success", ({ roomId }: { roomId: string }) => {
      console.log("Room created successfully:", roomId);
      router.push(`/room/${roomId}`);
    });

    return () => {
      socket.off("create-room-success");
    };
  }, [router, socket]);

  function handleCreate() {
    if (roomName.trim() === "") {
      setError("Fields cannot be empty");
      return;
    }

    setError("");
    socket?.emit("create-room", { roomName } as CreateRoomData);
  }

  return (
    <div className="max-w-[600px] w-full p-[25px] border border-room-card">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreate();
        }}
      >
        <div className="flex flex-col gap-[10px] w-full">
          <div className="flex flex-col gap-[2px] w-full">
            <label
              htmlFor="roomName"
              className="text-base text-room-card-input-label"
            >
              Room Name
            </label>
            <input
              type="text"
              id="roomName"
              className="bg-room-card-input max-w-[600px] text-md w-full border border-room-card-input-border px-[15px] py-[8px]"
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
          </div>

          <div>{error && <p className="text-red-400">{error}</p>}</div>
        </div>

        <button
          type="submit"
          className="bg-intro-navbar max-w-[600px] w-full mt-[10px] py-[10px] text-center cursor-pointer text-md font-medium inline-flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 active:scale-[0.98] transform"
        >
          <span>Create Room</span>
        </button>
      </form>
    </div>
  );
}
