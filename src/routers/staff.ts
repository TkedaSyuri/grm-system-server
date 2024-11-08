import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/find", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { staffId: req.staffId },
    });
    if (!staff) {
      res.status(404).json({ error: "スタッフが見つかりませんでした" });
    }
    res.json({
      staffId: staff?.staffId,
      staffName: staff?.staffName,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(500).json({ error: "サーバーエラー" });
    }
  }
});

export default router;
