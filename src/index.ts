import express from "express";
import type { Express} from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoute from "./routers/auth"
import staffRoute from "./routers/staff"
import roomRoute from "./routers/room"
import taskRoute from "./routers/tasks"

const app: Express = express();

const PORT = process.env.PORT || 10000;
const server: http.Server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGINS,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

app.use("/api/room",roomRoute)
app.use("/api/auth",authRoute)
app.use("/api/staff",staffRoute)


io.on("connection", (socket) => {
  console.log("クライアントと接続しました");

  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("クライアントとの接続が切れました");
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
