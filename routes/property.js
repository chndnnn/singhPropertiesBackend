// routes/propertyRoutes.js
import express from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
} from "../controllers/property.js";

const propertyRouter = express.Router();

propertyRouter.post("/properties", createProperty);     // Create
propertyRouter.get("/properties", getProperties);       // Read All
propertyRouter.get("/properties/:id", getPropertyById); // Read One
propertyRouter.post("/properties/:id", updateProperty);  // Update
propertyRouter.delete("/properties/:id", deleteProperty); // Delete

export default propertyRouter;
