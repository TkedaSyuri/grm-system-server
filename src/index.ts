import express from "express";
import prisma from "./lib/prismaClient";
import type { Express, Request, Response } from "express";
import cors from "cors"


const app: Express = express();
const PORT = 8080;

app.use(express.json())
app.use(cors())


app.get("/getFloorData", async (req: Request, res: Response) => {
    try {
      const allRoom = await prisma.floor2.findMany();
      return res.json(allRoom);
    } catch (err) {
      console.log(err);
    }
  });
  
app.listen(PORT, () => {
  console.log("Server running....8080");
});
