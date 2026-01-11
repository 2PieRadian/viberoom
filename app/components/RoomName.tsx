export default function RoomName({
  roomName,
}: {
  roomName: string | undefined;
}) {
  return (
    <div className="p-[5px] text-center mx-[5px] mt-[5px] bg-[hsl(270,6%,7%)] border-b border-video-player-border">
      <h1 className="text-base">Room - {roomName}</h1>
    </div>
  );
}
