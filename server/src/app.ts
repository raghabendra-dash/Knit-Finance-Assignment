import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import todoRouter from "./routes/todo.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/v1/todo", todoRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
  console.log(`MongoDB connected ✅`);
});

export default app;