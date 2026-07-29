import mongoose, { Schema, model, models } from "mongoose";

export interface IVehicle {
  _id: string;
  name: string;
  type: "sedan" | "suv" | "hatchback" | "luxury";
  description: string;
  pricePerDay: number;
  seats: number;
  transmission: "manual" | "automatic";
  fuel: "petrol" | "diesel" | "electric";
  image: string;
  available: boolean;
  features: string[];
  createdAt: Date;
}

const VehicleSchema = new Schema<IVehicle>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["sedan", "suv", "hatchback", "luxury"],
      required: true,
    },
    description: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    seats: { type: Number, required: true },
    transmission: {
      type: String,
      enum: ["manual", "automatic"],
      required: true,
    },
    fuel: {
      type: String,
      enum: ["petrol", "diesel", "electric"],
      required: true,
    },
    image: { type: String, required: true },
    available: { type: Boolean, default: true },
    features: [{ type: String }],
  },
  { timestamps: true },
);

export const Vehicle = models.Vehicle || model("Vehicle", VehicleSchema);
