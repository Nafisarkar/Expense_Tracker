import type {
  InferInsertModel,
  InferModel,
  InferSelectModel,
} from "drizzle-orm";
import type { Request, Response } from "express";
import type { transactions, users } from "./db/schema";

export type ControllerTypes = (req: Request, res: Response) => void;
// Full row type (for reading from DB)
export type User = InferSelectModel<typeof users>;
// Type for inserting a new row (DB will fill created_at automatically)
export type NewUser = InferInsertModel<typeof users>;
export type Transaction = InferSelectModel<typeof transactions>;
export type NewTransaction = InferInsertModel<typeof transactions>;
/// <reference types="@clerk/express/env" />
