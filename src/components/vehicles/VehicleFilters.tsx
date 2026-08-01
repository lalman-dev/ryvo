"use client";

import { useState } from "react";
import {
  SlidersHorizontal,
  Car,
  Truck,
  Bike,
  Users,
  Sparkles,
  CarFront,
  Van,
} from "lucide-react";

interface FiltersProps {
  onFilterChange: (filters: {
    type: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

const CATEGORIES = [
  { key: "all", label: "All", icon: <Sparkles size={13} /> },
  { key: "sedan", label: "Sedan", icon: <Car size={13} /> },
  { key: "suv", label: "SUV", icon: <CarFront size={13} /> },
  { key: "hatchback", label: "Hatchback", icon: <Car size={13} /> },
  { key: "luxury", label: "Luxury", icon: <Sparkles size={13} /> },
  { key: "van", label: "Van", icon: <Van size={13} /> },
  { key: "truck", label: "Truck", icon: <Truck size={13} /> },
  { key: "bike", label: "Bike", icon: <Bike size={13} /> },
];

const TYPE_ACCENT: Record<string, string> = {
  all: "#6366F1",
  sedan: "#6366F1",
  suv: "#0EA5E9",
  hatchback: "#10B981",
  luxury: "#F59E0B",
  van: "#8B5CF6",
  truck: "#EF4444",
  bike: "#F97316",
};

export default function VehicleFilters({ onFilterChange }: FiltersProps) {
  const [activeType, setActiveType] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onFilterChange({ type, minPrice, maxPrice });
  };

  const handlePriceChange = (key: "minPrice" | "maxPrice", value: string) => {
    const updated = { minPrice, maxPrice, [key]: value };
    if (key === "minPrice") setMinPrice(value);
    if (key === "maxPrice") setMaxPrice(value);
    onFilterChange({ type: activeType, ...updated });
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      {/* Category capsules */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
          marginBottom: "16px",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeType === cat.key;
          const accent = TYPE_ACCENT[cat.key];
          return (
            <button
              key={cat.key}
              onClick={() => handleTypeChange(cat.key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all 0.15s",
                flexShrink: 0,
                border: isActive
                  ? `1px solid ${accent}`
                  : "1px solid var(--border-primary)",
                backgroundColor: isActive ? accent : "var(--bg-secondary)",
                color: isActive ? "white" : "var(--text-secondary)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = accent;
                  e.currentTarget.style.color = accent;
                  e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "var(--border-primary)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
                }
              }}
            >
              {cat.icon}
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Price range + filter label */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-primary)",
          borderRadius: "12px",
          padding: "12px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            color: "var(--text-muted)",
            fontSize: "12px",
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <SlidersHorizontal size={13} style={{ color: "var(--accent)" }} />
          Price
        </div>
        <div
          style={{
            width: "1px",
            height: "16px",
            backgroundColor: "var(--border-primary)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
            flex: 1,
          }}
        >
          {[
            {
              key: "minPrice" as const,
              placeholder: "Min AED",
              value: minPrice,
            },
            {
              key: "maxPrice" as const,
              placeholder: "Max AED",
              value: maxPrice,
            },
          ].map((field) => (
            <input
              key={field.key}
              type="number"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => handlePriceChange(field.key, e.target.value)}
              style={{
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "8px",
                padding: "7px 10px",
                fontSize: "13px",
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) =>
                (e.target.style.borderColor = "var(--border-primary)")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
