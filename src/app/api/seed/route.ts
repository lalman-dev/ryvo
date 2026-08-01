import { NextResponse } from "next/server";
import { seedVehicles } from "@/lib/seed";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 });
  }

  try {
    await seedVehicles();
    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error("SEED ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
