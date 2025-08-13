import express from "express";
import type { Express} from "express";
import cors from "cors";
import authRoute from "./routers/auth"
import staffRoute from "./routers/staff"
import roomRoute from "./routers/rooms"
import tasksRoute from "./routers/tasks"
import chatsRoute from "./routers/chats"
import http from "http";
import { Server } from "socket.io";


const app: Express = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

app.use("/api/room",roomRoute)
app.use("/api/auth",authRoute)
app.use("/api/staff",staffRoute)
app.use("/api/tasks",tasksRoute)
app.use("/api/chats",chatsRoute)

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));
