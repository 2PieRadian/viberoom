export interface JoinRoomData {
  roomId: string;
  username: string;
}

export interface CheckRoomExistsResponse {
  roomId: string;
  exists: boolean;
}
