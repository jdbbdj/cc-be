import { model, Schema } from "mongoose";
import { CartsValidator } from "../validator/carts/carts.validator";
import { timestamps } from "./timestamps";

const CartSchema = new Schema<CartsValidator>(
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
  },
  timestamps
);

export const Cart = model("orders", CartSchema);
