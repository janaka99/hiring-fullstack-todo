import express from "express";
import config from "./config/config.js";
import { connectDB } from "./config/db.js";
import todoRouter from "./routes/todo.js";
import cors from "cors";

export function startServer({ port }: { port: number }) {
  const app = express();

  // connect db
  connectDB();

  app.use(
    cors({
      origin: config.origins,
    })
  );

  app.use(express.json());

  // routes
  app.use("/api/todos", todoRouter);

  app.listen(port, () => {
    console.log("Server running at ", port);
  });
}
