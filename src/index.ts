import express from "express";
import type { Express} from "express";
import cors from "cors";
import authRoute from "./routers/auth"
import staffRoute from "./routers/staff"
import roomRoute from "./routers/room"
import tasksRoute from "./routers/tasks"
import chatsRoute from "./routers/chats"
const app: Express = express();

const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(cors());

app.use("/api/room",roomRoute)
app.use("/api/auth",authRoute)
app.use("/api/staff",staffRoute)
app.use("/api/tasks",tasksRoute)
app.use("/api/chats",chatsRoute)



app.listen(PORT, () => console.log(`server is running on ${PORT}`));
