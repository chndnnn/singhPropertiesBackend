import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Property name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Property location is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "", // Optional default value
    },
    status: {
      type: String,
      enum: ["available", "sold"],
      default: "available",
    },
    date: {
      type: Date,
      required: [true, "Property date is required"],
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
