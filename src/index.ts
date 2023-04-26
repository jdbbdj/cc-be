import express, { Application } from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products/";
import orderRouter from "./routes/orders/";
import Connect from "./database/connect";

dotenv.config();
const app: Application = express();
app.use(express.json());
app.use("/products", productRouter);
app.use("/orders", orderRouter);
Connect();
app.listen(5000, () => {
  console.log("Server Running");
});
