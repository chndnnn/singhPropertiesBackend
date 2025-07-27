import User from "../models/user.js";

export const loginUser = async (req, res) => {
  const { name, password } = req.body;

  try {
    const user = await User.findOne({ name, password }); // Direct match (no encryption)
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    res.json({ message: "Login successful", user: { name: user.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Name and password are required" });
  }

  try {
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: { name: newUser.name } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};