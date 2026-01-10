"use client";

import { useEffect, useState } from "react";

export default function CreateRoomCard() {
  const [roomName, setRoomName] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleCreate() {
    if (roomName.trim() === "" || name.trim() === "") {
      setError("Fields cannot be empty");
      return;
    }

    setError("");
  }

  return (
    <div className="max-w-[600px] w-full rounded-[10px] p-[25px] border-[1px] border-room-card">
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
            className="bg-room-card-input max-w-[600px] text-md w-full px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>{error && <p className="text-red-400">{error}</p>}</div>
      </div>

      <div
        className="bg-intro-navbar max-w-[600px] text-md w-full rounded-[8px] mt-[10px] py-[10px] text-center cursor-pointer text-md"
        onClick={handleCreate}
      >
        Create Room
      </div>
    </div>
  );
}
