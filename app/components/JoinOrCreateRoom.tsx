"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import { SatoshiFont } from "../fonts";
import JoinRoomCard from "./JoinRoomCard";
import CreateRoomCard from "./CreateRoomCard";
import { Socket } from "socket.io-client";

const activeTabStyle = "bg-hover-tab";

interface JoinOrCreateRoomProps {
  socket: Socket | null;
}

export default function JoinOrCreateRoom({ socket }: JoinOrCreateRoomProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"j" | "c">("c");

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div>
      <div
        className={`${SatoshiFont.variable} border border-create-join-border mt-[50px] max-w-[600px] mx-auto py-[35px] px-[clamp(20px,6vw+1px,30px)] flex flex-col`}
        style={{ fontFamily: "var(--font-satoshi)" }}
        ref={ref}
      >
        <h1 className="text-2xl font-medium mb-[35px] text-[hsl(207,18%,90%)]">
          Create Or Join an Existing Room
        </h1>

        {/* Options */}
        <div className="w-full">
          <div className="flex items-center gap-[10px] pb-[10px] cursor-pointer text-[hsl(207,18%,90%)]">
            <div
              className={`CREATE_ROOM ${
                tab === "c" && activeTabStyle
              } text-md px-[20px] py-[10px] border-[1px] border-hover-tab`}
              onClick={() => setTab("c")}
            >
              Create a Room
            </div>

            <div
              className={`JOIN_ROOM ${
                tab === "j" && activeTabStyle
              } text-md px-[20px] py-[10px] border-[1px] border-hover-tab`}
              onClick={() => setTab("j")}
            >
              Join Room
            </div>
          </div>
          {tab === "j" ? (
            <JoinRoomCard socket={socket} />
          ) : (
            <CreateRoomCard socket={socket} />
          )}
        </div>
      </div>

      <div
        className={`${SatoshiFont.variable} pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2`}
        style={{ fontFamily: "var(--font-satoshi)" }}
      >
        <div className="inline-flex items-center gap-2 border border-create-join-border bg-[hsl(270,6%,7%)]/70 px-4 py-2 text-xs sm:text-sm text-[hsl(232,28%,80%)] shadow-lg shadow-black/40 backdrop-blur-md">
          <span className="whitespace-nowrap">
            Built by{" "}
            <span className="font-medium text-[hsl(207,18%,90%)]">
              Raman Bhardwaj
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
