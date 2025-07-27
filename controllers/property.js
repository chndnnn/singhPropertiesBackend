// controllers/propertyController.js
import { Property } from "../models/property.js";

// Create Property
export const createProperty = async (req, res) => {
  try {
    const { name, location, description, status, date } = req.body;

    const property = await Property.create({
      name,
      location,
      description, // new field
      status,
      date,
    });

    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Single Property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    const { name, location, description, status, date } = req.body;

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      { name, location, description, status, date }, // explicitly updating description
      { new: true, runValidators: true }
    );

    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
