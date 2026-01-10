"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { ClashDisplayFont, SatoshiFont } from "../fonts";
import { useState } from "react";

export default function RoomHeader({ roomId }: { roomId: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`${SatoshiFont.variable} flex items-center justify-between px-[20px] py-[15px] border-b border-b-create-join-border`}
      style={{ fontFamily: "var(--font-satoshi)" }}
    >
      <div
        className={`${ClashDisplayFont.variable}  flex flex-col`}
        style={{ fontFamily: "var(--font-clash-display)" }}
      >
        <h1 className="text-[clamp(20px,6vw,25px)]">viberoom</h1>
        <p className="text-[clamp(12px,6vw,14px)] mt-[-6px]">Just sync.</p>
      </div>

      <div className="flex items-center gap-2s">
        <h1 className="text-md flex items-center gap-2">
          Room:
          <span
            className={`font-medium ${
              copied ? "text-[#67ce67]" : "text-[hsl(232,58%,80%)]"
            }`}
          >
            {roomId}
          </span>
          <div
            className={`flex items-center justify-center cursor-pointer p-[7px] rounded-[5px] bg-[#2a2838] transition-all duration-200 ${
              copied ? "bg-[#356c488d]" : "bg-[#2a2838]"
            }`}
            onClick={() => {
              navigator.clipboard.writeText(roomId);
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            {copied ? (
              <CheckIcon className="w-4 h-4 text-[#1bc21b]" />
            ) : (
              <CopyIcon className="w-4 h-4 text-[#9fa6d9]" />
            )}
          </div>
        </h1>
      </div>

      {/* <div className="text-sm px-[15px] py-[5px] rounded-[8px] bg-white font-medium text-black cursor-pointer">
        Leave Room
      </div> */}
    </div>
  );
}
