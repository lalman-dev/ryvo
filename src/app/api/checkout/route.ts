import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { bookingId } = await req.json();
    if (!bookingId) {
      return NextResponse.json({ error: "Missing bookingId" }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.findById(bookingId).populate("vehicleId");
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    if (booking.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    }
    if (booking.paymentStatus === "paid") {
      return NextResponse.json(
        { error: "Booking is already paid" },
        { status: 400 },
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const vehicleName = booking.vehicleId?.name || "Vehicle";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "aed",
            product_data: {
              name: `${vehicleName} — ${booking.totalDays} day${booking.totalDays > 1 ? "s" : ""}`,
            },
            unit_amount: Math.round(booking.totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/bookings/${booking._id}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/vehicles/${booking.vehicleId?._id || ""}`,
      metadata: { bookingId: booking._id.toString() },
    });

    booking.stripeSessionId = checkoutSession.id;
    await booking.save();

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout session error:", error);
    return NextResponse.json(
      { error: "Failed to start checkout" },
      { status: 500 },
    );
  }
}
