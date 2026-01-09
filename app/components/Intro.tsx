"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { ClashDisplayFont } from "../fonts";

interface IIntroDoneProps {
  setIntroDone: (done: boolean) => void;
}

export default function Intro({ setIntroDone }: IIntroDoneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [showPara, setShowPara] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.set(titleRef.current, { opacity: 0, scale: 1 })
      .to(titleRef.current, {
        opacity: 1,
        duration: 1.5,
        scale: 2,
        ease: "power3.out",
      })
      .to(taglineRef.current, {
        opacity: 1,
        duration: 3,
        width: "auto",
        ease: "power3.out",
      })
      .to(taglineRef.current, {
        opacity: 0,
        duration: 0.6,
      })
      .to(containerRef.current, {
        height: "77px",
        duration: 1,
        ease: "power3.inOut",
      })
      .to(
        titleRef.current,
        {
          scale: 1,
          duration: 0.7,
          transformOrigin: "center top",
          ease: "power3.out",
          onComplete: () => {
            setShowPara(false);
          },
        },

        ">-=0.7"
      )
      .to(
        lineRef.current,
        {
          width: "100px",
          duration: 0.8,
          ease: "power3.out",
          onComplete: () => setIntroDone(true),
        },
        ">"
      );
  }, []);

  return (
    <div
      className={`${ClashDisplayFont.variable} flex flex-col items-center justify-center h-[100svh] bg-[#0d0d0e] py-[20px]`}
      style={{ fontFamily: "var(--font-clash-display)" }}
      ref={containerRef}
    >
      <h1 className="text-[24px] opacity-0 font-light" ref={titleRef}>
        viberoom
      </h1>
      <div ref={lineRef} className="bg-white h-[1px] w-0"></div>

      {showPara && (
        <div
          className="text-[20px] overflow-x-hidden text-[hsl(208,11%,73%)] w-0 whitespace-nowrap pt-[7px] opacity-0 text-center"
          ref={taglineRef}
        >
          Because videos hit different together.
        </div>
      )}
    </div>
  );
}
