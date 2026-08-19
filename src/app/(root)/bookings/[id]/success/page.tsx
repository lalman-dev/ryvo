import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { auth } from "@/lib/auth";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function BookingSuccessPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  await connectDB();
  const booking = await Booking.findById(id).populate("vehicleId");
  if (!booking || booking.userId !== session.user.id) redirect("/bookings");

  const paid = booking.paymentStatus === "paid";

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "20px",
          padding: "40px 28px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "16px",
            color: paid ? "var(--accent)" : "var(--text-muted)",
          }}
        >
          <CheckCircle size={48} />
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "8px" }}>
          {paid ? "Booking confirmed" : "Payment processing"}
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            marginBottom: "24px",
            lineHeight: 1.6,
          }}
        >
          {paid
            ? `Your booking for ${booking.vehicleId?.name || "your vehicle"} is confirmed. A receipt has been generated for your ${booking.totalDays} day rental.`
            : "We're still confirming your payment with Stripe. This page will update once it's done — check My Bookings shortly."}
        </p>
        <Link
          href="/bookings"
          style={{
            display: "inline-block",
            backgroundColor: "var(--accent)",
            color: "white",
            fontWeight: 600,
            fontSize: "14px",
            padding: "12px 24px",
            borderRadius: "12px",
            textDecoration: "none",
          }}
        >
          View My Bookings
        </Link>
      </div>
    </main>
  );
}
