"use client";

import { useState } from "react";
import Intro from "./components/Intro";
import JoinOrCreateRoom from "./components/JoinOrCreateRoom";
import { ClashDisplayFont } from "./fonts";

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div
      className={`${ClashDisplayFont.variable} min-h-[100svh]`}
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      <Intro setIntroDone={setIntroDone} />

      <div>{introDone && <JoinOrCreateRoom />}</div>
    </div>
  );
}
