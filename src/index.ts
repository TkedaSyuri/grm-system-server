import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());


//各階のデータを取得するapi
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

//部屋の状態を変更するapi
app.put("/editRoomState/:id", async(req: Request, res: Response)=>{
const id = Number(req.params.id);
const {roomState} = req.body
try{
  const editedRoomState = await prisma.room.update({
    where: {id},
    data: {
      roomState,
    }
  })
  return res.json(editedRoomState);
}catch(err){
  console.log(err);
  res.status(500).json({ messge: "データを更新できませんでした。" });
}
});



app.listen(PORT, () => {
  console.log("Server running....8080");
});
