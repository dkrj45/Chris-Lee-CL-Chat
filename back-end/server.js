//express, dotenv, helmet, socket.io installed
//client-side and server-side form validation,
const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 8080;
const URL = process.env.URL || "http://localhost:3000";

const helmet = require("helmet");

const { Server } = require("socket.io");

const server = require("http").createServer(app);

const io = new Server(server, {
    cors: {
        origin: URL,
        //credentials being true enables all cross-site cookies to travel over
        credentials: "true",
    }
});

app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome to CL Chat's Server")
  })

io.on("connect", socket => {
    console.log("socket connected")
})

server.listen(PORT, ()=>{
    console.log(`Server is ready on port ${PORT}`)
})