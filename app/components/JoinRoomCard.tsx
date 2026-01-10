"use client";

import { useState } from "react";

export default function JoinRoomCard() {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleJoin() {
    if (roomId.trim() === "" || name.trim() === "") {
      setError("Fields cannot be empty");
      return;
    }
    setError("");
  }

  return (
    <div className="max-w-[600px] w-full rounded-[10px] p-[25px] border-[1px] border-room-card">
      <div className="flex flex-col gap-[15px] w-full">
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
