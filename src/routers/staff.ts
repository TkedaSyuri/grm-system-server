import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/find", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { staff_id: req.staffId },
    });
    if (!staff) {
      res.status(404).json({ error: "スタッフが見つかりませんでした" });
    }
    res
      .status(200)
      .json({
        staffId: staff?.staff_id,
        staffName: staff?.staff_name,
        email: staff?.email,
      });
  } catch (err) {
    if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(500).json({ error: "内部サーバーエラー" });
      }
  }
});

export default router;



