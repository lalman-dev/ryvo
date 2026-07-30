import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/Vehicle";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const query: Record<string, unknown> = { available: true };

    if (type && type !== "all") query.type = type;
    if (minPrice) query.pricePerDay = { $gte: Number(minPrice) };
    if (maxPrice) {
      query.pricePerDay = {
        ...(query.pricePerDay as object),
        $lte: Number(maxPrice),
      };
    }

    const vehicles = await Vehicle.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ vehicles });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 },
    );
  }
}
