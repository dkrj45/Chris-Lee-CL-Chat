const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config();
const helmet = require("helmet");
const { Server } = require("socket.io");
const authRouter = require("./routes/authRouter");
const { sessionMiddleware, wrap } = require("./controllers/serverController");
const { authorizeUser, initializeUser, addFriend, onDisconnect, dm } = require("./controllers/socketController");


const PORT = process.env.PORT || 8080;
//client-side URL
const URL = process.env.URL || "http://localhost:3000";

const server = require("http").createServer(app);

const io = new Server(server, {
    cors: {
        origin: URL,
        //credentials being true enables all cross-site cookies to travel over
        credentials: true,
    }
});

app.use(helmet());

app.use(cors({
    origin: URL,
    credentials: true
}))

app.use(express.json());

app.use(sessionMiddleware)

app.use("/auth", authRouter)

app.get('/', (req, res) => {
    res.send("Welcome to CL Chat's Server")
  })

if (process.env.NODE_ENV === "production") {
    const staticDir = path.join(__dirname, "../front-end");
    app.use(express.static(staticDir));
    app.use((req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

io.use(wrap(sessionMiddleware))
io.use(authorizeUser);
io.on("connect", socket => {
    initializeUser(socket);

    socket.on("add_friend", (friendName, cb)=>{addFriend(socket, friendName, cb)});

    socket.on("dm", message => dm(socket, message));

    socket.on("disconnecting", () => onDisconnect(socket));
})

server.listen(PORT, ()=>{
    console.log(`Server is ready on port ${PORT}`)
})