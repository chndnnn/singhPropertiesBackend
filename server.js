import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from 'cors';
import userRoutes from "./routes/partner.js";
import propertyRouter from "./routes/property.js";
import transactionRoute from "./routes/transaction.js";
import personalRouter from "./routes/personal.js";
import personalTransactionRouter from "./routes/personalTransaction.js";

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json());

// Connect DB
await connectDB();

setInterval(() => {
  fetch(`${process.env.backend}/keep-alive`)
    .then((res) => res.text())
    .then(() => {
      console.log("Ping sent to keep server alive");
    })
    .catch((err) => console.error("Error sending ping:", err));
}, 14 * 60 * 1000); 

app.get("/keep-alive", (req, res) => {
  res.status(200).send("Server is alive!");
});

// Routes
app.use("/api", userRoutes);
app.use("/api", propertyRouter);
app.use("/api", transactionRoute);
app.use("/api", personalRouter);
app.use("/api", personalTransactionRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
