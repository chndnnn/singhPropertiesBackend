import express from "express";
import {
  createPersonalTransaction,
  getPersonalTransactions,
  getPersonalTransactionById,
  getPersonalTransactionsByPartnerName,
  updatePersonalTransaction,
  deletePersonalTransaction,
  deletePersonalTransactionsByPartnerName,
} from "../controllers/personalTransaction.js";

const personalTransactionRouter = express.Router();

// Create
personalTransactionRouter.post("/createPersonalTransaction", createPersonalTransaction);

// Read all
personalTransactionRouter.get("/getPersonalTransactions", getPersonalTransactions);

// Read one
personalTransactionRouter.get("/getPersonalTransactionById/:id", getPersonalTransactionById);

// Read by partnerName
personalTransactionRouter.get("/getPersonalTransactionsByPartnerName/:partnerName", getPersonalTransactionsByPartnerName);

// Update
personalTransactionRouter.put("/updatePersonalTransaction/:id", updatePersonalTransaction);

// Delete
personalTransactionRouter.delete("/deletePersonalTransaction/:id", deletePersonalTransaction);

personalTransactionRouter.delete(
  "/personal-transactions/partner/:partnerName",
  deletePersonalTransactionsByPartnerName
);


export default personalTransactionRouter;
