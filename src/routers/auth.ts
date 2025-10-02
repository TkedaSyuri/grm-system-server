import express from "express";
import prisma from "../lib/prismaClient";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { staffName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingStaff = await prisma.staff.findUnique({
    where: {
      email: email,
    },
  });
  if (existingStaff) {
    return res.status(400).json({
      message: "このメールは既に登録されています",
    });
  }
  await prisma.staff.create({
    data: {
      staffName: staffName,
      email: email,
      password: hashedPassword,
    },
  });
  return res.status(200).json({ message: "スタッフの登録に成功しました" });
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const staff = await prisma.staff.findUnique({
    where: { email },
  });
  if (!staff) {
    return res
      .status(400)
      .json({ error: "メールアドレスかパスワードが間違っています。" });
  }

  const isPasswordValid = await bcrypt.compare(password, staff.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "パスワードが間違っています。" });
  }

  const token = jwt.sign({ id: staff.staffId }, process.env.SECRET_KEY!, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite:"none",
    maxAge: 24 * 60 * 60 * 1000, // 1日
  });
  return res.status(200).json({ message: "ログイン成功" });
});

//ログアウト
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({ message: "ログアウトしました" });
  } catch (err) {
    return res.status(404).json({ message: "ログアウトできませんでした" });
  }
});

export default router;
