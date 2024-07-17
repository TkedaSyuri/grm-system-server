import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/getFloorData/:floorNumber", async (req: Request, res: Response) => {
  const { floorNumber } = req.params;
  const floorId = parseInt(floorNumber)
  try {
    const floorData = await prisma.room.findMany({
      where: {
        floorId: floorId
      },
      orderBy: { roomNumber: "asc" },
    });
    return res.json(floorData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messge: "サーバーエラー" });
  }
});

// app.get('/getFloorData/:floor', async (req: Request, res: Response) => {
//   const { floor } = req.params;
//   try {
//     const FloorData = await getFloorData(floor);
//     return res.json(FloorData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(PORT, () => {
  console.log("Server running....8080");
});
