import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";

const router = express.Router();


router.get("/", async (req: Request, res: Response) => {
  try {
    const floors = await prisma.floor.findMany({
      include: {
        rooms: {
          orderBy: { id: "asc" },
        },
      },
    });

    const allRooms = floors.flatMap((floor) => floor.rooms);

    return res.json(allRooms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "データを取得できませんでした" });
  }
});

export default router

