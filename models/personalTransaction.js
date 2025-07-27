import mongoose from "mongoose";

const personalTransactionSchema = new mongoose.Schema(
  {
    partnerName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["investment", "return"],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be >= 0"],
    },
    method: {
      type: String,
      enum: ["cash", "online"],
      required: true,
      default: "cash",
    },
    bankName: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

export const PersonalTransaction = mongoose.model("PersonalTransaction", personalTransactionSchema);
