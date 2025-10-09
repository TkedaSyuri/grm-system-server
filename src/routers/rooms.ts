import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import { io } from "..";

const router = express.Router();

router.get("/:floorNumber", async (req: Request, res: Response) => {
  const floorNumber = Number(req.params.floorNumber);
  try {
    const floorData = await prisma.floor.findUnique({
      where: {
        floorNumber: floorNumber,
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
    res.status(500).json({ message: "データを取得できませんでした" });
  }
});


router.put("/:roomId/state", async (req: Request, res: Response) => {
  const roomId = Number(req.params.roomId);
  const { roomState } = req.body;
  try {
    await prisma.room.update({
      where: { id:roomId},
      data: {
        roomState,
      },
    });

    io.emit("updatedRoomState", { roomId: roomId, roomState:roomState });
　
    return res.status(200).json({ message: "データの更新に成功しました" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "データを更新できませんでした。" });
  }
});

router.put(
  "/:roomId/is-consecutive-nights",
  async (req: Request, res: Response) => {
    const id = Number(req.params.roomId);
    try {
      const currentIsConsecutiveNight = await prisma.room.findUnique({
        where: { id },
        select: { isConsecutiveNight: true },
      });
      const changedIsConsecutiveNight = !currentIsConsecutiveNight?.isConsecutiveNight;

      const updated = await prisma.room.update({
        where: { id },
        data: {
          isConsecutiveNight: changedIsConsecutiveNight,
        },
      });

      // 更新通知を全クライアントに送る
      io.emit("updatedRoomState", {
        roomId: updated.id,
        isConsecutiveNight: updated.isConsecutiveNight,
      });

      return res.status(200).json({ message: "データの更新に成功しました" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "データを更新できませんでした。" });
    }
  }
);

export default router;
