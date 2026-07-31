import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/Vehicle";
import VehicleDetailClient from "@/components/vehicles/VehicleDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();
  const vehicle = await Vehicle.findById(id).lean();

  if (!vehicle) notFound();

  return <VehicleDetailClient vehicle={JSON.parse(JSON.stringify(vehicle))} />;
}
