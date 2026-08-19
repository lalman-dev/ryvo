import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "You must be signed in to book a vehicle" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const {
      vehicleId,
      startDate,
      endDate,
      pickupLocation,
      totalDays,
      totalPrice,
    } = body;

    if (!vehicleId || !startDate || !endDate || !pickupLocation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectDB();

    const booking = await Booking.create({
      userId: session.user.id,
      vehicleId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalDays,
      totalPrice,
      pickupLocation,
      status: "pending",
      paymentStatus: "pending",
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    await connectDB();

    const bookings = await Booking.find({ userId: session.user.id })
      .populate("vehicleId")
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 },
    );
  }
}
