import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import * as dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 10000;
const server: http.Server = http.createServer(app);

const corsOrigins = process.env.CORS_ORIGINS ;

const io = new Server(server, {
  cors: {
    origin: corsOrigins,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(cors());

// 各階のデータを取得するAPI
app.get("/getFloorData/:floorNumber", async (req: Request, res: Response) => {
  const { floorNumber } = req.params;
  try {
    const floorData = await prisma.floor.findUnique({
      where: {
        floorNumber: parseInt(floorNumber),
      },
      include: {
        rooms: {
          orderBy: { id: "asc" },
        },
      },
    });
    const roomData = floorData?.rooms;
    return res.json(roomData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "サーバーエラー" });
  }
});

// 部屋の状態を変更するAPI
app.put("/editRoomState/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { roomState } = req.body;
  try {
    const editedRoomState = await prisma.room.update({
      where: { id },
      data: {
        roomState,
      },
    });
    return res.json(editedRoomState);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "データを更新できませんでした。" });
  }
});

// クライアントと通信
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
