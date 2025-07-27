import { PersonalTransaction } from "../models/personalTransaction.js";

// Create a new personal transaction
export const createPersonalTransaction = async (req, res) => {
  try {
    const personalTransaction = await PersonalTransaction.create(req.body);
    res.status(201).json({ success: true, data: personalTransaction });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all personal transactions (optionally filter by partnerName)
export const getPersonalTransactions = async (req, res) => {
  try {
    const { partnerName } = req.query;
    const filter = partnerName ? { partnerName } : {};
    const personalTransactions = await PersonalTransaction.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, data: personalTransactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single personal transaction by ID
export const getPersonalTransactionById = async (req, res) => {
  try {
    const personalTransaction = await PersonalTransaction.findById(req.params.id);
    if (!personalTransaction)
      return res
        .status(404)
        .json({ success: false, message: "Personal transaction not found" });
    res.status(200).json({ success: true, data: personalTransaction });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get personal transactions by partnerName
export const getPersonalTransactionsByPartnerName = async (req, res) => {
  try {
    const { partnerName } = req.params;
    if (!partnerName) {
      return res
        .status(400)
        .json({ success: false, message: "Partner name is required" });
    }

    const personalTransactions = await PersonalTransaction.find({ partnerName });

    if (!personalTransactions || personalTransactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No personal transactions found for this partner",
      });
    }

    res.status(200).json({ success: true, data: personalTransactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a personal transaction
export const updatePersonalTransaction = async (req, res) => {
  try {
    const personalTransaction = await PersonalTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!personalTransaction)
      return res
        .status(404)
        .json({ success: false, message: "Personal transaction not found" });
    res.status(200).json({ success: true, data: personalTransaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a personal transaction
export const deletePersonalTransaction = async (req, res) => {
  try {
    const personalTransaction = await PersonalTransaction.findByIdAndDelete(
      req.params.id
    );
    if (!personalTransaction)
      return res
        .status(404)
        .json({ success: false, message: "Personal transaction not found" });
    res
      .status(200)
      .json({ success: true, message: "Personal transaction deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete all personal transactions for a given partner name
export const deletePersonalTransactionsByPartnerName = async (req, res) => {
  try {
    const { partnerName } = req.params;
    if (!partnerName) {
      return res
        .status(400)
        .json({ success: false, message: "Partner name is required" });
    }

    const result = await PersonalTransaction.deleteMany({ partnerName });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No personal transactions found for this partner",
      });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} personal transaction(s) deleted successfully for partner: ${partnerName}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

