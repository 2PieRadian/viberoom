export interface JoinRoomData {
  roomId: string;
  username: string;
}

export interface CheckRoomExistsResponse {
  roomId: string;
  exists: boolean;
}

export interface Member {
  socketId: string;
  username: string;
}

export interface RoomData {
  roomId: string;
  roomName: string;
  currentTime: number;
  isPlaying: boolean;
  videoId: string;
  members: Member[];
}
