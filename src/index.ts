import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import authRoute from "./routers/auth"
import staffRoute from "./routers/staff"
import roomRoute from "./routers/room"
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

app.use("/api/auth",authRoute)
app.use("/api/staff",staffRoute)
app.use("/api/room",roomRoute)


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
