import mongoose, { Schema, model, models } from "mongoose";

export interface IBooking {
  _id: string;
  userId: string;
  vehicleId: string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  pickupLocation: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    vehicleId: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    pickupLocation: { type: String, required: true },
  },
  { timestamps: true },
);

export const Booking = models.Booking || model("Booking", BookingSchema);
