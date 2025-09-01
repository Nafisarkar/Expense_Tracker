import express from "express";
import dotenv from "dotenv";
import transactionRouter from "./routes/transaction.routes.js";
import { pingDB } from "./utils/pingdb.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/user.routes.js";
import morgan from "morgan";
import cors from "cors";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware());
app.use(morgan("dev"));

app.get("/api/ping", async (req, res) => {
  try {
    res.status(200).json({
      messsage: "Ok",
      db: "Connected",
    });
  } catch (err) {
    console.log("Something went wrong !", err);
    res.status(404).json({
      messsage: "failed",
    });
  }
});

app.use("/api", transactionRouter);
app.use("/api/users", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

pingDB().then(() => {
  app.listen(process.env.PORT, async () => {
    console.log(
      `Server running at http://localhost:${process.env.PORT || 3000}`
    );
  });
});
