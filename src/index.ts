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
  try {
    const floorData = await prisma.floor.findUnique({
      where: {
        floorNumber: parseInt(floorNumber),
      },
      include: {
        rooms: {
          orderBy: {id: "asc"},
        }
      },
    });
    const roomData = floorData?.rooms
    return res.json(roomData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ messge: "サーバーエラー" });
  }
});


// app.get("/getFloorData/:floorNumber", async (req: Request, res: Response) => {
//   const { floorNumber } = req.params;
//   try {
//     const floorData = await prisma.room.findMany({
//       where: {
//         floorId: parseInt(floorNumber)
//       },
//       orderBy: { roomNumber: "asc" },
//     });
//     return res.json(floorData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ messge: "サーバーエラー" });
//   }
// });



app.listen(PORT, () => {
  console.log("Server running....8080");
});
