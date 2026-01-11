"use client";

import { useEffect, useState } from "react";
import Intro from "./components/Intro";
import JoinOrCreateRoom from "./components/JoinOrCreateRoom";
import { ClashDisplayFont } from "./fonts";
import { Socket } from "socket.io-client";
import { getSocket } from "./lib/socket";
import { useRouter } from "next/navigation";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const router = useRouter();

  useEffect(() => {
    const socket = getSocket();

    socket.on("connect", () => {
      console.log("Connected with Socket ID:", socket.id);
      setSocket(socket);

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    });

    socket.on("join-room-success", ({ roomId }: { roomId: string }) => {
      router.push(`/room/${roomId}`);
      console.log(roomId);
    });
  }, []);

  return (
    <div
      className={`${ClashDisplayFont.variable}`}
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      <Intro setIntroDone={setIntroDone} />

      <div className="px-[20px]">
        {introDone && <JoinOrCreateRoom socket={socket} />}
      </div>
    </div>
  );
}
