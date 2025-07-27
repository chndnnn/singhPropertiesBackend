import { Partner } from "../models/partner.js";

export const createPartner = async (req, res) => {
  try {
    const { name, number, bank = [] } = req.body;
    const partner = await Partner.create({ name, number, bank });
    res.status(201).json(partner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPartner = async (req, res) => {
  try {
    const partner = await Partner.find();
    res.json(partner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPartnerById = async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePartner = async (req, res) => {
  try {
    const deletePartner = await Partner.findByIdAndDelete(req.params.id);
    if (!deletePartner) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new bank to the partner's bank array
export const updatePartner = async (req, res) => {
  try {
    const { id } = req.params; // Partner ID
    const { name, number, bank } = req.body; // Fields to update

    const updatedPartner = await Partner.findByIdAndUpdate(
      id,
      { name, number, bank },   // New data
      { new: true, runValidators: true } // Return updated doc & validate
    );

    if (!updatedPartner) return res.status(404).json({ message: "Partner not found" });

    res.json(updatedPartner);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
