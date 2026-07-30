"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Fuel, Settings, ArrowRight } from "lucide-react";
import { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

export default function VehicleCard({ vehicle, index }: VehicleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-zinc-800">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full capitalize">
            {vehicle.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-white text-lg leading-tight">
            {vehicle.name}
          </h3>
          <div className="text-right shrink-0 ml-2">
            <span className="text-blue-400 font-bold text-lg">
              AED {vehicle.pricePerDay}
            </span>
            <span className="text-zinc-500 text-xs block">/day</span>
          </div>
        </div>

        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 leading-relaxed">
          {vehicle.description}
        </p>

        {/* Specs */}
        <div className="flex items-center gap-4 mb-4 text-zinc-400 text-xs">
          <span className="flex items-center gap-1.5">
            <Users size={13} />
            {vehicle.seats} seats
          </span>
          <span className="flex items-center gap-1.5">
            <Settings size={13} />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel size={13} />
            {vehicle.fuel}
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {vehicle.features.slice(0, 3).map((f) => (
            <span
              key={f}
              className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-md"
            >
              {f}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span className="text-xs bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md">
              +{vehicle.features.length - 3} more
            </span>
          )}
        </div>

        <Link
          href={`/vehicles/${vehicle._id}`}
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-2.5 rounded-xl transition-all hover:gap-3"
        >
          Book Now <ArrowRight size={15} />
        </Link>
      </div>
    </motion.div>
  );
}
