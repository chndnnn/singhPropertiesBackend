import express from "express";
import {
  createPersonal,
  getAllPersonal,
  getPersonalById,
  updatePersonal,
  deletePersonal,
} from "../controllers/personal.js";

const personalRouter = express.Router();

personalRouter.post("/createPersonal", createPersonal);        // Create
personalRouter.get("/getAllPersonal", getAllPersonal);         // Read all
personalRouter.get("/getPersonalById/:id", getPersonalById);     // Read one
personalRouter.put("/updatePersonalById/:id", updatePersonal);      // Update
personalRouter.delete("/getPersonalById/:id", deletePersonal);   // Delete

export default personalRouter;
