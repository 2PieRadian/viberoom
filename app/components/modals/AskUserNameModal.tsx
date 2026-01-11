"use client";

import { joinRoom } from "@/app/lib/socket";
import { SatoshiFont } from "@/app/fonts";
import { useState } from "react";

export default function AskUserNameModal({
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

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmitUserName();
    }
  }

  return (
    <div className="fixed inset-0 w-full h-full bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className={`${SatoshiFont.variable} flex flex-col border border-create-join-border bg-[hsl(270,6%,7%)] p-[30px] w-[90%] max-w-[420px] shadow-2xl shadow-black/50`}
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        {/* Header */}
        <div className="mb-[25px]">
          <h2 className="text-xl font-medium text-[hsl(207,18%,90%)] mb-[6px]">
            Welcome to the Room
          </h2>
          <p className="text-sm text-room-card-input-label opacity-80">
            Enter your name to join the{" "}
            <span className="text-[hsl(261,100%,80%)] font-medium select-all">
              vibe
            </span>
          </p>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-[6px] w-full">
          <label
            htmlFor="username"
            className="text-base text-room-card-input-label"
          >
            Your Name
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter a name"
            className="bg-room-card-input text-md w-full border border-room-card-input-border px-[16px] py-[12px] text-white placeholder:text-room-card-input-label/50 focus:outline-none focus:border-intro-navbar/60 transition-colors duration-200"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        {/* Error message */}
        {error && <p className="text-red-400 text-sm mt-[10px]">{error}</p>}

        {/* Submit button */}
        <button
          className="bg-intro-navbar text-md w-full mt-[20px] py-[12px] text-center cursor-pointer font-medium hover:opacity-90 transition-opacity duration-200 active:scale-[0.98] transform"
          onClick={handleSubmitUserName}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
