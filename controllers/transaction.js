import { Transaction } from "../models/transaction.js";

// Create a new transaction
export const createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all transactions (optionally filter by propertyName)
export const getTransactions = async (req, res) => {
  try {
    const { propertyName } = req.query;
    const filter = propertyName ? { propertyName } : {};
    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTransactionByPropertyName = async (req, res) => {
  try {
    const { propertyName } = req.params; // Correct way to extract propertyName
    if (!propertyName) {
      return res.status(400).json({ success: false, message: "Property name is required" });
    }

    const transactions = await Transaction.find({ propertyName }); // find by propertyName

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this property" });
    }

    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, message: "Transaction not found" });
    res.status(200).json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete all transactions for a given property name
export const deleteTransactionsByPropertyName = async (req, res) => {
  try {
    const { propertyName } = req.params; // or req.body if sent in POST
    if (!propertyName) {
      return res.status(400).json({ success: false, message: "Property name is required" });
    }

    const result = await Transaction.deleteMany({ propertyName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No transactions found for this property" });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} transaction(s) deleted successfully for property: ${propertyName}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

