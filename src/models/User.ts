import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: "google" | "credentials";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    provider: {
      type: String,
      enum: ["google", "credentials"],
      default: "credentials",
    },
  },
  { timestamps: true },
);

export const User = models.User || model("User", UserSchema);
