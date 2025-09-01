import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export async function pingDB() {
  try {
    await pool.query("SELECT 1"); // simple query
    console.log("✅ DB is Connected!");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  } finally {
    await pool.end();
  }
}
