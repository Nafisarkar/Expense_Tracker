import { getAuth } from "@clerk/express";
import { db } from "../db";
import { transactions } from "../db/schema";
import type { ControllerTypes } from "../types";
import { and, desc, eq } from "drizzle-orm";

export const addTransaction: ControllerTypes = async (req, res) => {
  const { userId } = await getAuth(req);
  console.log("REQ BODY", req);
  const { type, amount, category, note } = req.body;
  try {
    await db
      .insert(transactions)
      .values({
        user_id: userId!,
        type,
        amount,
        category,
        note,
      })
      .returning()
      .then(() => {
        res.status(201).json({
          message: "success",
        });
      });
  } catch (err) {
    console.error("Error adding transaction:", err);
    res.status(400).json({
      message: "failed",
    });
  }
};

export const listAllTransection: ControllerTypes = async (req, res) => {
  const { userId } = await getAuth(req);

  try {
    const transactionsList = await db
      .select()
      .from(transactions)
      .where(eq(transactions.user_id, userId!))
      .orderBy(desc(transactions.date));

    if (!transactionsList.length) {
      return res.status(404).json({
        message: "No transactions found",
      });
    }

    res.status(200).json({
      transactionsList,
    });
  } catch (err) {
    console.error("Error getting all transactions list:", err);
    res.status(400).json({
      message: "failed",
    });
  }
};

export const updateTransection: ControllerTypes = async (req, res) => {
  const { id } = req.params;
  const { type, amount, category, note } = req.body;
  const { userId } = await getAuth(req);

  try {
    const foundTransaction = await db
      .select()
      .from(transactions)
      .where(
        and(eq(transactions.id, Number(id)), eq(transactions.user_id, userId!))
      );

    if (!foundTransaction.length) {
      return res.status(404).json({
        message: "falied",
      });
    }
    // Update the transaction

    await db
      .update(transactions)
      .set({
        type,
        amount,
        category,
        note,
      })
      .where(
        and(eq(transactions.id, Number(id)), eq(transactions.user_id, userId!))
      )
      .returning()
      .then(() => {
        res.status(200).json({
          message: "success",
        });
      });
  } catch (err) {
    console.error("Error updating transaction:", err);
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};

export const deleteTransection: ControllerTypes = async (req, res) => {
  const { id } = req.params;
  const { userId } = getAuth(req);

  try {
    await db
      .delete(transactions)
      .where(
        and(eq(transactions.id, Number(id)), eq(transactions.user_id, userId!))
      );

    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.error("Error deleting a transaction:", err);
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};

export const getReport: ControllerTypes = (req, res) => {
  try {
    res.status(200).json({
      message: "Summary (monthly/annual/category)",
    });
  } catch (err) {
    console.error("Error Gettin transaction Report:", err);
    res.status(400).json({
      message: "Something Went Wrong",
    });
  }
};
