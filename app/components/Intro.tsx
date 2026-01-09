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
        width: 0,
        duration: 0.7,
      })
      .to(
        containerRef.current,
        {
          height: "77px",
          duration: 1,
          ease: "power3.inOut",
        },
        ">-=0.4"
      )
      .to(
        titleRef.current,
        {
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          onComplete: () => {
            setShowPara(false);
            setIntroDone(true);
          },
        },

        ">-=0.7"
      );
  }, []);

  return (
    <div
      className={`${ClashDisplayFont.variable} flex flex-col items-center justify-center h-[calc(100svh-1px)] border-b border-[#222323] bg-card py-[20px]`}
      style={{ fontFamily: "var(--font-clash-display)" }}
      ref={containerRef}
    >
      <h1 className="text-[24px] opacity-0 font-light" ref={titleRef}>
        viberoom
      </h1>

      {showPara && (
        <div
          className="text-[20px] overflow-x-hidden text-[hsl(0,0%,81%)] w-0 whitespace-nowrap pt-[7px] opacity-0 text-center"
          ref={taglineRef}
        >
          Because videos hit different together.
        </div>
      )}
    </div>
  );
}
