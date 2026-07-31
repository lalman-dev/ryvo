"use client";

import { useEffect, useState, useCallback } from "react";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import { Vehicle } from "@/types";
import { Car } from "lucide-react";

interface Filters {
  type: string;
  minPrice: string;
  maxPrice: string;
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    minPrice: "",
    maxPrice: "",
  });

  const fetchVehicles = useCallback(async (f: Filters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.type !== "all") params.set("type", f.type);
      if (f.minPrice) params.set("minPrice", f.minPrice);
      if (f.maxPrice) params.set("maxPrice", f.maxPrice);

      const res = await fetch(`/api/vehicles?${params.toString()}`);
      const data = await res.json();
      setVehicles(data.vehicles || []);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles(filters);
  }, [filters, fetchVehicles]);

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Available Vehicles
          </h1>
          <p className="text-zinc-400">
            {loading
              ? "Loading..."
              : `${vehicles.length} vehicle${vehicles.length !== 1 ? "s" : ""} available`}
          </p>
        </div>

        {/* Filters */}
        <VehicleFilters onFilterChange={setFilters} />

        {/* Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl h-80 animate-pulse"
              />
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-24">
            <Car size={40} className="text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">
              No vehicles match your filters
            </p>
            <p className="text-zinc-600 text-sm mt-1">
              Try adjusting the type or price range
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle._id} vehicle={vehicle} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
