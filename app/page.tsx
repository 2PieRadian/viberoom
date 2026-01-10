"use client";

import { useEffect, useState } from "react";
import Intro from "./components/Intro";
import JoinOrCreateRoom from "./components/JoinOrCreateRoom";
import { ClashDisplayFont } from "./fonts";
import { Socket } from "socket.io-client";
import { getSocket } from "./lib/socket";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected with Socket ID:", socket.id);
    });
  }, []);

  return (
    <div
      className={`${ClashDisplayFont.variable}`}
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      <Intro setIntroDone={setIntroDone} />

      <div className="px-[20px]">{introDone && <JoinOrCreateRoom />}</div>
    </div>
  );
}
