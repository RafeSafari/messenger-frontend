import { io, Socket } from "socket.io-client";

const serverUrl = process.env.NODE_ENV === 'production' ? 'https://api.fake-cometchat-domain.ir' : 'http://localhost:50005';

export const socket: Socket = io(serverUrl, {
  autoConnect: true,
  withCredentials: true,
});