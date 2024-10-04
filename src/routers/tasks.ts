import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";

const router = express.Router();

router.get("/all-tasks", async (req: Request, res: Response) => {
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
    const createdTodo = await prisma.task.create({
      data: {
        task: task,
        is_completed: isCompleted,
      },
    });
    return res.json(createdTodo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/edit-task/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { task, isCompleted } = req.body;
  try {
    const editedTodo = await prisma.task.update({
      where: { id },
      data: {
        task: task,
        is_completed: isCompleted,
      },
    });
    return res.json(editedTodo);
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
