import { model, Schema } from "mongoose";
import { OrderValidator } from "../validator/orders/orders.validator";
import { timestamps } from "./timestamps";
const OrderSchema = new Schema<OrderValidator>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  timestamps
);

export const Order = model("orders", OrderSchema);
