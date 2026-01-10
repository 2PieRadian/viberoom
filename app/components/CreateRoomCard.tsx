export default function CreateRoomCard() {
  return (
    <div className="max-w-[600px] w-full rounded-[10px] p-[25px] border-[1px] border-room-card">
      <div className="flex flex-col gap-[5px] w-full">
        <label
          htmlFor="roomName"
          className="text-base text-room-card-input-label"
        >
          Room Name
        </label>
        <input
          type="text"
          id="roomName"
          className="bg-room-card-input max-w-[600px] text-md w-full px-[16px] border-[1px] border-room-card-input-border rounded-[8px] px-[10px] py-[8px]"
          placeholder="Enter room name"
        />
      </div>

      <div className="bg-intro-navbar max-w-[600px] text-md w-full rounded-[8px] mt-[15px] py-[10px] text-center cursor-pointer text-md">
        Create Room
      </div>
    </div>
  );
}
