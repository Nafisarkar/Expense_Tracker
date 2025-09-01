import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";
import { Pool } from "pg";
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
