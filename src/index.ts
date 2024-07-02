import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/getFloorData", async (req: Request, res: Response) => {
  try {
    const allRoom = await prisma.floor2.findMany({orderBy: {
      id: 'asc'
    }});
    return res.json(allRoom);
  } catch (err) {
    console.log(err);
  }
});

app.put("/editRoomState/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { roomState } = req.body;
    await prisma.floor2.update({
      where: { id },
      data: {
        roomState,
      },
    });
    return res.status(201).json("部屋の状態が更新されました")
  } catch (err) {
    return res.status(401).json(err);
  }
});

app.listen(PORT, () => {
  console.log("Server running....8080");
});
