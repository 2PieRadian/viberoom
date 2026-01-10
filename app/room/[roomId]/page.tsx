"use client";

import RoomHeader from "@/app/components/RoomHeader";
import { useParams } from "next/navigation";

export default function RoomPage() {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div>
      <RoomHeader roomId={roomId} />
    </div>
  );
}
