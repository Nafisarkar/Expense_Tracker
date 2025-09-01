import express from "express";
import {
  addTransaction,
  updateTransection,
  listAllTransection,
  deleteTransection,
  getReport,
} from "../controllers/transaction.controllers";
import { requireAuth } from "@clerk/express";
const transactionRouter = express.Router();

transactionRouter.post("/expense", requireAuth(), addTransaction);
transactionRouter.get("/expense", requireAuth(), listAllTransection);
transactionRouter.put("/expense/:id", requireAuth(), updateTransection);
transactionRouter.delete("/expense/:id", requireAuth(), deleteTransection);
transactionRouter.get("/reports", getReport);

export default transactionRouter;
