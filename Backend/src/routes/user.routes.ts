import express from "express";
import { db } from "../db";
import { users } from "../db/schema";
import { getAuth, requireAuth } from "@clerk/express";
import { eq } from "drizzle-orm";
const userRouter = express.Router();

userRouter.post("/create", requireAuth(), async (req, res) => {
  const { userId, isAuthenticated } = getAuth(req);
  console.log("User ID from Clerk:", userId);

  if (!userId && !isAuthenticated) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (existingUser.length > 0) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser[0],
      });
    }

    const { email, name } = req.body;
    const newUser = await db
      .insert(users)
      .values({ id: userId, name: name, email: email });

    res.status(201).json({
      message: "User created",
      user: newUser,
    });
  } catch (err) {
    console.log("Something went wrong ", err);
    res.status(400).json({
      message: "failed",
    });
  }
});

userRouter.get("/me", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = await db.select().from(users).where(eq(users.id, userId));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user[0]);
  } catch (err) {
    console.log("Something went wrong ", err);
    res.status(400).json({
      message: "failed",
    });
  }
});

export default userRouter;
