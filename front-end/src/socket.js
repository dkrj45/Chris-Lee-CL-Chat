import { io } from "socket.io-client";

const socket = new io({
  autoConnect: false,
  withCredentials: true,
  path: "/api/socket",
});

export default socket;
