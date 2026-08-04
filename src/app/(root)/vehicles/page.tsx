"use client";

import { useEffect, useState, useCallback } from "react";
import VehicleCard from "@/components/vehicles/VehicleCard";
import VehicleFilters from "@/components/vehicles/VehicleFilters";
import PageTransition from "@/components/ui/PageTransition";
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
    <PageTransition>
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-primary)",
          color: "var(--text-primary)",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
        >
          {/* Page header */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 800,
                color: "var(--text-primary)",
                marginBottom: "6px",
                letterSpacing: "-0.02em",
              }}
            >
              Our Fleet
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
              {loading
                ? "Loading vehicles..."
                : `${vehicles.length} vehicle${vehicles.length !== 1 ? "s" : ""} available`}
            </p>
          </div>

          {/* Filters */}
          <VehicleFilters onFilterChange={setFilters} />

          {/* Grid */}
          {loading ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-primary)",
                    borderRadius: "16px",
                    height: "320px",
                    animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                  }}
                />
              ))}
            </div>
          ) : vehicles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "96px 24px" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "16px",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <Car size={24} style={{ color: "var(--text-muted)" }} />
              </div>
              <p
                style={{
                  color: "var(--text-primary)",
                  fontWeight: 600,
                  marginBottom: "6px",
                }}
              >
                No vehicles match your filters
              </p>
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Try adjusting the type or price range
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}
            >
              {vehicles.map((vehicle, i) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
