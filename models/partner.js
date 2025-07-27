import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  number: {
    type: String,
    required: [true, "Please add a number"],
    unique: true
  },
  bank: {
    type: [String],  // Array of bank names
    default: []      // Default to an empty array
  }
}, {
  timestamps: true
});

export const Partner = mongoose.model("Partner", partnerSchema);
