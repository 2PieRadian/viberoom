export default function JoinRoomCard() {
  return (
    <div className="w-full bg-room-card rounded-[10px] p-[25px]">
      <div className="flex flex-col gap-[5px] w-full">
        <label
          htmlFor="roomId"
          className="text-base text-room-card-input-label"
        >
          Room Id
        </label>
        <input
          type="text"
          id="roomId"
          className="bg-room-card-input max-w-[600px] text-md w-full px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
          placeholder="Enter room id here"
        />
      </div>

      <div className="bg-cerulean-blue-700 max-w-[600px] text-md w-full rounded-[8px] mt-[15px] py-[10px] text-center cursor-pointer text-md">
        Join Room
      </div>
    </div>
  );
}
