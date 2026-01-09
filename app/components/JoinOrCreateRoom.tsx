"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { SatoshiFont } from "../fonts";

function JoinRoomCard() {
  return (
    <div className="w-full h-[200px] bg-room-card rounded-[10px] flex items-center justify-center">
      Join Room Card
    </div>
  );
}

function CreateRoomCard() {
  return (
    <div className="w-full h-[200px] bg-room-card rounded-[10px] flex items-center justify-center">
      Create Room Card
    </div>
  );
}

const activeTabStyle = "bg-intro-navbar";

export default function JoinOrCreateRoom() {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"j" | "c">("j");

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      className={`${SatoshiFont.variable} px-[clamp(20px,6vw+1px,30px)] flex flex-col`}
      style={{ fontFamily: "var(--font-satoshi)" }}
      ref={ref}
    >
      <h1 className="text-2xl font-medium py-[40px]">
        Join Or Create an Existing Room
      </h1>

      {/* Options */}
      <div className="w-full">
        <div className="flex items-center gap-[10px] pb-[10px] cursor-pointer text-[hsl(0,0%,81%)]">
          <div
            className={`JOIN_ROOM ${
              tab === "j" && activeTabStyle
            } text-md px-[20px] py-[10px] rounded-[8px]`}
            onClick={() => setTab("j")}
          >
            Join Room
          </div>
          <div
            className={`CREATE_ROOM ${
              tab === "c" && activeTabStyle
            } text-md px-[20px] py-[10px] rounded-[8px]`}
            onClick={() => setTab("c")}
          >
            Create a Room
          </div>
        </div>

        {tab === "j" ? <JoinRoomCard /> : <CreateRoomCard />}
      </div>
    </div>
  );
}
