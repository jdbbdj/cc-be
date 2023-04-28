import express, { Application } from "express";
import dotenv from "dotenv";
import productRouter from "./routes/products/";
import orderRouter from "./routes/orders/";
import cartRouter from "./routes/carts";
import userRouter from "./routes/users";
import authRouter from "./routes/users/auth";
import Connect from "./database/connect";

/************DOTENV************/
dotenv.config();

const app: Application = express();

/************APP DECLARATION************/
app.use(express.json());

/************ROUTES************/
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

/************MONGODB************/
Connect();

/************PORT************/
app.listen(5000, () => {
  console.log("Server Running");
});
