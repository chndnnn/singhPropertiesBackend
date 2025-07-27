import Personal from "../models/personal.js";

// Create a new Personal
export const createPersonal = async (req, res) => {
  try {
    const personal = new Personal(req.body);
    await personal.save();
    res.status(201).json(personal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Personal records
export const getAllPersonal = async (req, res) => {
  try {
    const personals = await Personal.find();
    res.json(personals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Personal by ID
export const getPersonalById = async (req, res) => {
  try {
    const personal = await Personal.findById(req.params.id);
    if (!personal) {
      return res.status(404).json({ message: "Personal not found" });
    }
    res.json(personal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Personal by ID
export const updatePersonal = async (req, res) => {
  try {
    const personal = await Personal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!personal) {
      return res.status(404).json({ message: "Personal not found" });
    }
    res.json(personal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Personal by ID
export const deletePersonal = async (req, res) => {
  try {
    const personal = await Personal.findByIdAndDelete(req.params.id);
    if (!personal) {
      return res.status(404).json({ message: "Personal not found" });
    }
    res.json({ message: "Personal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
