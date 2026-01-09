"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function JoinOrCreateRoom() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0 },
      { opacity: 1, y: -20, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      className="px-[clamp(20px,6vw+1px,30px)] pt-[30px] flex flex-col items-center"
      ref={ref}
    >
      <h1 className="text-2xl font-medium pt-[20px]">Join Or Create Room</h1>
    </div>
  );
}
