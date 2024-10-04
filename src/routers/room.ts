import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";


const router = express.Router();


router.get("/get/floor/:floorNumber", async (req: Request, res: Response) => {
    const  floorNumber  = Number(req.params.floorNumber);
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
      return res.status(200).json({message: "データの更新に成功しました"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "データを更新できませんでした。" });
    }
  });
  
 router.get("/get/is-consecutive-nights/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    try {
      const isConsecData = await prisma.room.findUnique({
        where: { id },
      });
      return res.json(isConsecData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "データを取得できませんでした" });
    }
  });
  
 router.put("/edit/is-consecutive-nights/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { isConsecRoom } = req.body;
    try {
      await prisma.room.update({
        where: { id },
        data: {
          is_ConsecRoom:isConsecRoom,
        },
      });
      return res.status(200).json({message: "データの更新に成功しました"});
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "データを更新できませんでした。" });
    }
  });
  

  export default router;

  