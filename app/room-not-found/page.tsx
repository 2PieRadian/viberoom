"use client";

import Link from "next/link";
import { ClashDisplayFont, SatoshiFont } from "../fonts";

export default function RoomNotFound() {
  return (
    <div
      className={`${ClashDisplayFont.variable} min-h-screen flex flex-col`}
      style={{ fontFamily: "var(--font-clash-display)" }}
    >
      {/* Header - matches Intro navbar final state */}
      <div className="flex items-center justify-center h-[77px] border-b border-[#222323] bg-intro-navbar py-[20px]">
        <h1 className="text-xl font-light">viberoom</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-[20px]">
        <div
          className={`${SatoshiFont.variable} border border-create-join-border max-w-[500px] w-full py-[50px] px-[clamp(20px,6vw+1px,40px)] flex flex-col items-center text-center`}
          style={{ fontFamily: "var(--font-satoshi)" }}
        >
          <h2 className="text-2xl font-medium mb-[12px] text-[hsl(207,18%,90%)]">
            Room Not Found
          </h2>

          <p className="text-md text-room-card-input-label mb-[30px]">
            The room you're looking for doesn't exist or may have been closed.
          </p>

          <Link
            href="/"
            className="bg-intro-navbar text-white text-md px-[30px] py-[12px] transition-opacity hover:opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
