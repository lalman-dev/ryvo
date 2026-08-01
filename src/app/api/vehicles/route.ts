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
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice)
        (query.pricePerDay as Record<string, number>).$gte = Number(minPrice);
      if (maxPrice)
        (query.pricePerDay as Record<string, number>).$lte = Number(maxPrice);
    }

    const vehicles = await Vehicle.find(query).sort({ pricePerDay: 1 });

    return NextResponse.json({ vehicles });
  } catch (error) {
    console.error("VEHICLES ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
