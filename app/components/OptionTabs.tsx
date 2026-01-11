"use client";

import { useState } from "react";

function LiveChatTab() {
  return (
    <div className="flex flex-col gap-[5px]">
      <h1 className="text-base font-medium">Live Chat</h1>

      <div className="bg-live-chat-inner-bg h-full mb-[11px] p-[10px] text-sm">
        Raman: Hello
      </div>
    </div>
  );
}

function ParticipantsTab() {
  return <div>Participants</div>;
}

export default function OptionTabs({
  videoId,
  setVideoId,
  handleVideoIdChange,
  setCollapse,
  collapse,
}: {
  videoId: string;
  setVideoId: (videoId: string) => void;
  handleVideoIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
}) {
  const [tab, setTab] = useState<"participants" | "live-chat">("live-chat");

  return (
    <div className="w-full min-h-[300px] lg:w-[30%] flex flex-col gap-[20px] bg-live-chat-bg px-[10px] pt-[10px] border border-video-player-border">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-base font-medium">Watch Video</h1>
        <input
          type="text"
          placeholder="Paste a YouTube video link"
          className="w-full bg-live-chat-inner-bg p-[10px] text-sm"
          onChange={handleVideoIdChange}
        />
      </div>

      {tab === "live-chat" ? <LiveChatTab /> : <ParticipantsTab />}
    </div>
  );
}

// Collapse Button to be shown only if the tab is collapsed (will use later)

//   if (collapse) {
//     return (
//       <div
//         className="w-full min-h-[300px] lg:w-[30px] bg-live-chat-bg px-[10px] pt-[10px] border border-video-player-border"
//         onClick={() => setCollapse(false)}
//       ></div>
//     );
//   }

/* <button
        onClick={() => setCollapse(true)}
        className="text-sm text-[hsl(257,46%,66%)] transition cursor-pointer hover:bg-[hsl(259,19%,23%)] w-full bg-[#262230] px-[10px] py-[5px]"
      >
        Collapse
      </button> */
