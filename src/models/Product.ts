import { model, Schema } from "mongoose";
import { ProductValidator } from "../validator/products/products.validator";
import { timestamps } from "./timestamps";
const ProductSchema = new Schema<ProductValidator>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: [String], required: true },
    size: { type: [String], required: true },
    color: { type: [String], required: true },
    price: { type: Number, required: true },
  },
  timestamps
);

export const Product = model("products", ProductSchema);
