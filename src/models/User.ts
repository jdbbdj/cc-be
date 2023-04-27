import { model, Schema } from "mongoose";
import { UserValidator } from "../validator/users/users.validator";
import { timestamps } from "./timestamps";

const UserSchema = new Schema<UserValidator>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  timestamps
);

export const User = model("user", UserSchema);
