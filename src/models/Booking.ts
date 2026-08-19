import mongoose, { Schema, model, models } from "mongoose";

export interface IBooking {
  _id: string;
  userId: string;
  vehicleId: mongoose.Types.ObjectId | string;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  paymentStatus: "pending" | "paid" | "failed";
  stripeSessionId?: string;
  pickupLocation: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: String, required: true },
    vehicleId: { type: Schema.Types.ObjectId, ref: "Vehicle", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: { type: String },
    pickupLocation: { type: String, required: true },
  },
  { timestamps: true },
);

export const Booking = models.Booking || model("Booking", BookingSchema);
