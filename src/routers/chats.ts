import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import { io } from "..";

const router = express.Router();

router.get("/chats", async (req: Request, res: Response) => {
  try {
    const allChats = await prisma.chat.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json(allChats);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/chat", async (req: Request, res: Response) => {
  const { message } = req.body;
  try {
    await prisma.chat.create({
      data: {
        message: message,
      },
    });
    io.emit("updatedChat", { message });

    return res.status(200).json({ message: "メッセージの作成に成功しました" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/chat/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.chat.delete({ where: { id } });
    io.emit("updatedChat");

    return res.status(200).json({ message: "メッセージの削除に成功しました" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/chats", async (req: Request, res: Response) => {
  try {
    await prisma.chat.deleteMany();
    io.emit("updatedChat");

    return res
      .status(200)
      .json({ message: "すべてのメッセージの削除に成功しました" });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
