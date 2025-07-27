import express from "express";
import {
  createPartner,
  getPartner,
  getPartnerById,
  deletePartner,
  updatePartner
} from "../controllers/partner.js";
import { createUser, loginUser } from "../controllers/user.js";

const partnerRouter = express.Router();

partnerRouter.post("/createPartner", createPartner);
partnerRouter.get("/getPartner", getPartner);
partnerRouter.get("/getPartner/:id", getPartnerById);
partnerRouter.post("/deletePartner/:id", deletePartner);
partnerRouter.post("/updatePartner/:id", updatePartner);
partnerRouter.post("/loginUser", loginUser);
partnerRouter.post("/createUser", createUser);

export default partnerRouter;
