//client-side and server-side form validation,
const express = require("express");
const app = express();
const cors = require("cors")
require('dotenv').config();
const helmet = require("helmet");
const { Server } = require("socket.io");
const authRouter = require("./routes/authRouter")
const session = require("express-session")

const PORT = process.env.PORT || 8080;
//client-side URL
const URL = process.env.URL || "http://localhost:3000";

const server = require("http").createServer(app);

const io = new Server(server, {
    cors: {
        origin: URL,
        //credentials being true enables all cross-site cookies to travel over
        credentials: "true",
    }
});

app.use(helmet());

app.use(cors({
    origin: URL,
    credentials: true
}))

app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.ENVIRONMENT === "production",
        httpOnly: true,
        expires: 1000 * 60 * 60 *24 * 7,
        sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
    }
}))

app.use("/auth", authRouter)

app.get('/', (req, res) => {
    res.send("Welcome to CL Chat's Server")
  })

io.on("connect", socket => {
    console.log("socket connected")
})

server.listen(PORT, ()=>{
    console.log(`Server is ready on port ${PORT}`)
})