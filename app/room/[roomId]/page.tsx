"use client";

import RoomHeader from "@/app/components/RoomHeader";
import VideoContainer from "@/app/components/VideoContainer";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();
  const [videoId, setVideoId] = useState<string>("ta99S6Fh53c");

  return (
    <div className="max-w-[1700px] w-full mx-auto">
      <RoomHeader roomId={roomId} />
      <VideoContainer videoId={videoId} />

      <Link href={`/`}>Change</Link>
    </div>
  );
}
