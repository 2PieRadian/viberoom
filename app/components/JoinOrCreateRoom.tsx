"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";

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
  const [joinTab, setJoinTab] = useState<"j" | "c">("j");

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  function handleTabClick(e: React.MouseEvent<HTMLDivElement>) {
    setJoinTab(!joinTab);
  }

  return (
    <div
      className="px-[clamp(20px,6vw+1px,30px)] flex flex-col items-center"
      ref={ref}
    >
      <h1 className="text-2xl font-medium py-[30px]">
        Join Or Create an Existing Room
      </h1>

      {/* Options */}
      <div className="w-full">
        <div className="flex items-center gap-[30px] pb-[10px] cursor-pointer text-[hsl(0,0%,81%)]">
          <div
            className={`JOIN_ROOM ${
              joinTab === "j" && activeTabStyle
            } text-[20px] px-[20px] py-[10px] rounded-[8px]`}
            onClick={() => setJoinTab("j")}
          >
            Join Room
          </div>
          <div
            className={`CREATE_ROOM ${
              joinTab === "c" && activeTabStyle
            } text-[20px] px-[20px] py-[10px] rounded-[8px]`}
            onClick={() => setJoinTab("c")}
          >
            Create a Room
          </div>
        </div>

        {joinTab === "j" ? <JoinRoomCard /> : <CreateRoomCard />}
      </div>
    </div>
  );
}
