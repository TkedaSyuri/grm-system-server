import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/all-tasks", async(req: Request, res: Response) => {
  try {
    const allTasks = await prisma.task.findMany({ orderBy: { id: "asc" } }); 
    return res.json(allTasks);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/create-task", async (req: Request, res: Response) => {
  const { task, isCompleted } = req.body;
  try {
    await prisma.task.create({
      data: {
        task: task,
        isCompleted: isCompleted,
      },
    });
    return res.status(200).json({message: "業務の作成に成功しました"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/edit-completed-task/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { isCompleted} = req.body;
  try {
   await prisma.task.update({
      where: { id },
      data: {
        isCompleted: isCompleted
      },
    });
    return res.status(200).json({message: "業務の編集に成功しました"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/delete-task/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prisma.task.delete({ where: { id } });
    return res.status(200).json({message: "業務の削除に成功しました"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/tasks", async (req: Request, res: Response) => {
  try {
    await prisma.task.deleteMany();
    return res.status(200).json({message: "全ての業務の削除に成功しました"});
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
