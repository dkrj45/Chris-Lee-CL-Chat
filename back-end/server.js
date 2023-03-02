const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const { Server } = require("socket.io");
const authRouter = require("./routes/authRouter");
const {
  authorizeUser,
  initializeUser,
  addFriend,
  onDisconnect,
  dm,
} = require("./controllers/socketController");
const knex = require("knex");
const knexfile = require("./knexfile");
const path = require("path");

knex(knexfile[process.env.NODE_ENV || "development"]).migrate.latest();

const PORT = process.env.PORT || 8080;
//client-side URL
const URL = process.env.URL || "http://localhost:3000";

const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: URL,
    //credentials being true enables all cross-site cookies to travel over
    credentials: true,
  },
  path: "/api/socket",
});

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  const staticDir = path.join(__dirname, "../front-end");
  app.use(express.static(staticDir));
  app.use((req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}
io.use(authorizeUser);
io.on("connect", (socket) => {
  console.log("socket connected");
  initializeUser(socket);

  socket.on("add_friend", (friendName, cb) => {
    addFriend(socket, friendName, cb);
  });

  socket.on("dm", (message) => dm(socket, message));

  socket.on("disconnecting", () => onDisconnect(socket));
});

server.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`);
});
