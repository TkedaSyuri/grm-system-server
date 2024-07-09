import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

const getFloorData = async (floorNumber: string) => {
  switch (floorNumber) {
    case '2':
      return prisma.floor2.findMany({ orderBy: { id: 'asc' } });
    case '3':
      return prisma.floor3.findMany({ orderBy: { id: 'asc' } });
    case '4':
      return prisma.floor4.findMany({ orderBy: { id: 'asc' } });
    case '5':
      return prisma.floor5.findMany({ orderBy: { id: 'asc' } });
    case '6':
      return prisma.floor6.findMany({ orderBy: { id: 'asc' } });
    case '7':
      return prisma.floor7.findMany({ orderBy: { id: 'asc' } });
    case '8':
      return prisma.floor8.findMany({ orderBy: { id: 'asc' } });
    case '9':
      return prisma.floor9.findMany({ orderBy: { id: 'asc' } });
    case '10':
      return prisma.floor10.findMany({ orderBy: { id: 'asc' } });
    case '11':
      return prisma.floor11.findMany({ orderBy: { id: 'asc' } });
    case '12':
      return prisma.floor12.findMany({ orderBy: { id: 'asc' } });
    case '13':
      return prisma.floor13.findMany({ orderBy: { id: 'asc' } });
    case '14':
      return prisma.floor14.findMany({ orderBy: { id: 'asc' } });
    default:
      throw new Error(`Invalid floor number: ${floorNumber}`);
  }
};

app.get('/getFloorData/:floor', async (req: Request, res: Response) => {
  const { floor } = req.params;
  try {
    const FloorData = await getFloorData(floor);
    return res.json(FloorData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }

});app.put("/editRoomState/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { roomState } = req.body;
    await prisma.floor2.update({
      where: { id },
      data: {
        roomState,
      },
    });
    return res.status(201).json("部屋の状態が更新されました");
  } catch (err) {
    return res.status(401).json(err);
  }
});

app.listen(PORT, () => {
  console.log("Server running....8080");
});
