import { io } from "socket.io-client";

const socket = (user) =>
  new io({
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
    path: "/api/socket",
  });

export default socket;
