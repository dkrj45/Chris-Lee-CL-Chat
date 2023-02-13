import {io} from "socket.io-client";

const URL = process.env.URL || "http://localhost:8080";

const socket = new io(URL, {
    autoConnect: false,
    withCredentials: true
})

export default socket;