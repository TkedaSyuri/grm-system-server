import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import { io } from "..";

const router = express.Router();

router.get("/get/floor/:floorNumber", async (req: Request, res: Response) => {
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


router.put("/edit/room-state/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { roomState } = req.body;
  try {
    await prisma.room.update({
      where: { id },
      data: {
        roomState,
      },
    });

    io.emit("updatedRoomState", { roomId: id, roomState });

    return res.status(200).json({ message: "データの更新に成功しました" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "データを更新できませんでした。" });
  }
});

router.put(
  "/is-consecutive-nights/:id",
  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
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
