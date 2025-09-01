import {
  numeric,
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "income",
  "expense",
]);

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: varchar("name", { length: 100 }).notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  user_id: varchar("user_id")
    .references(() => users.id)
    .notNull(),
  type: transactionTypeEnum("type").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  category: varchar("category"),
  date: timestamp("date").notNull().defaultNow(),
  note: varchar("note", { length: 100 }),
});
