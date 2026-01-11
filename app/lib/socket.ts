import { io, Socket } from "socket.io-client";
import { JoinRoomData } from "./types";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });
  }

  return socket;
}

export function joinRoom(data: JoinRoomData) {
  getSocket().emit("join-room", data);
}

export function checkRoomExists(roomId: string) {
  getSocket().emit("check-room-exists", roomId);
}
