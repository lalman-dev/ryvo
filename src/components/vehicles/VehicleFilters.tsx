"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

interface FiltersProps {
  onFilterChange: (filters: {
    type: string;
    minPrice: string;
    maxPrice: string;
  }) => void;
}

const TYPES = ["all", "sedan", "suv", "hatchback", "luxury"];

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
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "16px",
        padding: "20px 24px",
        marginBottom: "32px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "var(--text-secondary)",
          fontWeight: 600,
          fontSize: "13px",
          marginBottom: "16px",
        }}
      >
        <SlidersHorizontal size={15} style={{ color: "var(--accent)" }} />
        Filter Vehicles
      </div>

      {/* Type capsules */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginBottom: "20px",
        }}
      >
        {TYPES.map((type) => {
          const isActive = activeType === type;
          return (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              style={{
                padding: "6px 16px",
                borderRadius: "9999px",
                fontSize: "13px",
                fontWeight: 500,
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.15s",
                border: isActive
                  ? "1px solid var(--accent)"
                  : "1px solid var(--border-primary)",
                backgroundColor: isActive
                  ? "var(--accent)"
                  : "var(--bg-tertiary)",
                color: isActive ? "white" : "var(--text-secondary)",
              }}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Price range */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
      >
        {[
          {
            key: "minPrice" as const,
            label: "Min Price (AED/day)",
            placeholder: "0",
            value: minPrice,
          },
          {
            key: "maxPrice" as const,
            label: "Max Price (AED/day)",
            placeholder: "1000",
            value: maxPrice,
          },
        ].map((field) => (
          <div key={field.key}>
            <label
              style={{
                display: "block",
                fontSize: "11px",
                color: "var(--text-muted)",
                marginBottom: "6px",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              {field.label}
            </label>
            <input
              type="number"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => handlePriceChange(field.key, e.target.value)}
              style={{
                width: "100%",
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "10px",
                padding: "9px 12px",
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
          </div>
        ))}
      </div>
    </div>
  );
}
