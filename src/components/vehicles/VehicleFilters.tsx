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
    const updated = {
      minPrice,
      maxPrice,
      [key]: value,
    };
    if (key === "minPrice") setMinPrice(value);
    if (key === "maxPrice") setMaxPrice(value);
    onFilterChange({ type: activeType, ...updated });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-4 text-zinc-300 font-semibold text-sm">
        <SlidersHorizontal size={16} />
        Filter Vehicles
      </div>

      {/* Type tabs */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => handleTypeChange(type)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
              activeType === type
                ? "bg-blue-600 text-white"
                : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Price range */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <label className="text-xs text-zinc-500 mb-1 block">
            Min Price (AED/day)
          </label>
          <input
            type="number"
            placeholder="0"
            value={minPrice}
            onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex-1">
          <label className="text-xs text-zinc-500 mb-1 block">
            Max Price (AED/day)
          </label>
          <input
            type="number"
            placeholder="1000"
            value={maxPrice}
            onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
