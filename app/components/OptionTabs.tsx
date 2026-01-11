"use client";

import { useState } from "react";

export default function OptionTabs() {
  const [tab, setTab] = useState<"participants" | "live-chat">("participants");

  return (
    <div className="w-full min-h-[300px] lg:w-[30%] flex flex-col gap-[10px] bg-live-chat-bg px-[10px] pt-[10px] border border-video-player-border">
      <h1 className="text-base font-medium">Live Chat</h1>

      <div className="bg-live-chat-inner-bg h-full mb-[11px] p-[10px] text-sm">
        Raman: Hello
      </div>
    </div>
  );
}
