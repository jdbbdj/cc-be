import { model, Schema } from "mongoose";
import { CartsValidator } from "../validator/carts/carts.validator";

const CartSchema = new Schema<CartsValidator>({
  image: { type: String, required: true },
  images: [{ type: String, required: true }],
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: Number, required: true }],
  description: { type: String },
  dateCreated: { type: Date, required: true, default: Date.now },
  createdBy: { type: Number, required: true, default: 1 },
  dateUpdated: { type: Date, required: true, default: Date.now },
  updatedBy: { type: Number, required: true, default: 1 },
});

export const Cart = model("orders", CartSchema);
