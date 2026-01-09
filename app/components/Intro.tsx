"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ClashDisplayFont } from "../fonts";

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.set(containerRef.current, { height: "100svh" });

    tl.set(titleRef.current, { opacity: 0, scale: 1.3 })
      .to(titleRef.current, {
        opacity: 1,
        duration: 1.5,
        scale: 1.6,
        ease: "power3.out",
      })
      .from(taglineRef.current, {
        opacity: 0,
        duration: 3,
        width: 0,
        x: -20,
        ease: "power3.out",
      })
      .to(taglineRef.current, {
        opacity: 0,
        duration: 0.6,
      })
      .to(containerRef.current, {
        height: "auto",
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        titleRef.current,
        {
          scale: 1,
          duration: 1,
          y: 10,
          transformOrigin: "center top",
          ease: "power3.out",
        },
        "<"
      );
  }, []);

  return (
    <div
      className={`${ClashDisplayFont.variable} flex flex-col items-center justify-center py-[20px]`}
      style={{ fontFamily: "var(--font-clash-display)" }}
      ref={containerRef}
    >
      <h1 className={`text-[30px]`} ref={titleRef}>
        viberoom
      </h1>

      <div
        className="text-[20px] overflow-x-hidden whitespace-nowrap"
        ref={taglineRef}
      >
        Because videos hit different together.
      </div>
    </div>
  );
}
