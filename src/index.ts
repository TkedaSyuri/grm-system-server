import express from "express";
import prisma from "./lib/prismaClient";


import type { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8080;

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
