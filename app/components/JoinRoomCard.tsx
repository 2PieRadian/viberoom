export default function JoinRoomCard() {
  return (
    <div className="w-full bg-room-card rounded-[10px] flex p-[25px]">
      <div className="flex flex-col gap-[5px]">
        <label
          htmlFor="roomId"
          className="text-base text-room-card-input-label"
        >
          Room Id
        </label>
        <input
          type="text"
          id="roomId"
          className="bg-room-card-input px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
          placeholder="Enter room id here"
        />
      </div>
    </div>
  );
}
