"use client";

import { useEffect, useRef, useState } from "react";
import {
  extractYouTubeVideoId,
  formatSeconds,
  getRandomImageUrl,
} from "../lib/utils";
import { Interaction, Member, RoomData } from "../lib/types";
import { getSocket } from "../lib/socket";

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

function ParticipantsTab({ participants }: { participants: Member[] }) {
  return (
    <div className="max-h-full flex flex-col gap-[10px]">
      <h1 className="text-base font-medium">
        Participants ({participants.length})
      </h1>

      <div className="flex max-h-[240px] flex-col gap-[10px] overflow-y-auto custom-scrollbar">
        {participants?.map((participant: Member) => (
          <ParticipantCard
            key={participant.socketId}
            name={participant.username}
          />
        ))}
      </div>
    </div>
  );
}

function ParticipantCard({ name }: { name: string }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(getRandomImageUrl());
  }, []);

  return (
    <div className="flex items-center gap-[10px]">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Participant"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-[2px]">
        <h1 className="text-sm font-medium">{name}</h1>
      </div>
    </div>
  );
}

function InteractionCard({ interaction }: { interaction: Interaction }) {
  const meta =
    interaction.type === "play"
      ? {
          label: "Play",
          dot: "bg-emerald-400",
          message: "played the video",
        }
      : interaction.type === "pause"
      ? {
          label: "Pause",
          dot: "bg-amber-400",
          message: "paused the video",
        }
      : {
          label: "Seek",
          dot: "bg-sky-400",
          message: `seeked to ${formatSeconds(interaction.time)}`,
        };

  return (
    <div className="flex items-start justify-between border border-video-player-border/60 bg-live-chat-inner-bg/70 px-[12px]">
      <span className="text-sm text-[hsl(207,18%,90%)] truncate">
        <span className="font-semibold">{interaction.username}</span>{" "}
        <span className="opacity-80">{meta.message}</span>
      </span>

      <div className="shrink-0 text-[12px] text-room-card-input-label/80">
        {formatSeconds(interaction.time)}
      </div>
    </div>
  );
}

function InteractionHistory({ interactions }: { interactions: Interaction[] }) {
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (interactions.length === 0) return;

    // Auto-scroll to the newest interaction
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [interactions.length]);

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium">Interaction History</h1>
        <span className="text-xs text-room-card-input-label/70">
          {interactions.length}
        </span>
      </div>

      {interactions.length === 0 ? (
        <div className="rounded-[10px] border border-video-player-border/60 bg-live-chat-inner-bg/40 px-[12px] py-[12px] text-sm text-room-card-input-label/80">
          No interactions yet. Play, pause, or seek to start the history.
        </div>
      ) : (
        <div
          ref={listRef}
          className="flex max-h-[220px] flex-col gap-[8px] py-[10px] overflow-y-auto custom-scrollbar pr-[4px] bg-live-chat-inner-bg"
        >
          {interactions.map((interaction, idx) => (
            <InteractionCard
              key={`${interaction.type}-${interaction.time}-${interaction.username}-${idx}`}
              interaction={interaction}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface OptionTabsProps {
  roomData: RoomData;
  interactions: Interaction[];
}

export default function OptionTabs({
  roomData,
  interactions,
}: OptionTabsProps) {
  const participants = roomData?.members;
  const [tab, setTab] = useState<"participants" | "live-chat">("participants");
  const [youtubeLink, setYoutubeLink] = useState<string | "">("");
  const socket = getSocket();

  function handleYoutubeLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log("Youtube link changed:", e.target.value);
    setYoutubeLink(e.target.value);

    if (e.target.value.trim() === "") return;
    const videoId = extractYouTubeVideoId(e.target.value);

    if (!videoId) return;
    console.log("Video ID:", videoId);

    // If the videoId is the same as the current videoId, don't do anything
    if (roomData?.videoId === videoId) return;

    socket.emit("video-id-updated", { roomId: roomData.roomId, videoId });
  }

  return (
    <div className="w-full min-h-[300px] lg:w-[30%] flex flex-col gap-[20px] bg-live-chat-bg px-[10px] pt-[10px] border border-video-player-border">
      <div className="flex flex-col gap-[5px]">
        <h1 className="text-base font-medium">Watch Video</h1>
        <input
          type="text"
          value={youtubeLink}
          placeholder="Paste a YouTube video link"
          className="w-full bg-live-chat-inner-bg p-[10px] text-sm outline-none"
          onChange={handleYoutubeLinkChange}
        />
      </div>

      {tab === "live-chat" ? (
        <LiveChatTab />
      ) : (
        <ParticipantsTab participants={participants} />
      )}

      <InteractionHistory interactions={interactions} />
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
