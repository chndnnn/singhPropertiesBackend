import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionById,
  getTransactionByPropertyName,
  updateTransaction,
  deleteTransaction,
  deleteTransactionsByPropertyName,
} from "../controllers/transaction.js";

const transactionRoute = express.Router();

transactionRoute.post("/createTransactions", createTransaction);       // Create transaction
transactionRoute.get("/transactions", getTransactions);          // Get all transactions (filter by ?propertyName=xyz)
transactionRoute.get("/transaction/:propertyName", getTransactionByPropertyName);    // Get single transaction
transactionRoute.put("/updateTransaction/:id", updateTransaction);     // Update transaction
transactionRoute.delete("/deleteTansaction/:id", deleteTransaction);  // Delete transaction
transactionRoute.delete("/transactions/property/:propertyName", deleteTransactionsByPropertyName);

export default transactionRoute;
