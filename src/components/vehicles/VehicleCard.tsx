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

const TYPE_COLORS: Record<string, string> = {
  sedan: "#6366F1",
  suv: "#0EA5E9",
  hatchback: "#10B981",
  luxury: "#F59E0B",
  van: "#8B5CF6",
  truck: "#EF4444",
  bike: "#F97316",
};

export default function VehicleCard({ vehicle, index }: VehicleCardProps) {
  const accentColor = TYPE_COLORS[vehicle.type] || "var(--accent)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-primary)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "pointer",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "200px",
          overflow: "hidden",
          backgroundColor: "var(--bg-tertiary)",
        }}
      >
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.5s" }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
          }}
        />
        {/* Type badge */}
        <div style={{ position: "absolute", top: "12px", left: "12px" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              backgroundColor: accentColor,
              color: "white",
              padding: "4px 10px",
              borderRadius: "9999px",
              textTransform: "capitalize",
              letterSpacing: "0.03em",
            }}
          >
            {vehicle.type}
          </span>
        </div>
        {/* Price overlay on image */}
        <div style={{ position: "absolute", bottom: "12px", right: "12px" }}>
          <span
            style={{
              fontSize: "14px",
              fontWeight: 800,
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "white",
              padding: "4px 10px",
              borderRadius: "8px",
            }}
          >
            AED {vehicle.pricePerDay}
            <span style={{ fontSize: "11px", fontWeight: 400, opacity: 0.8 }}>
              /day
            </span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px 20px" }}>
        {/* Name */}
        <h3
          style={{
            fontWeight: 700,
            fontSize: "17px",
            color: "var(--text-primary)",
            marginBottom: "6px",
            letterSpacing: "-0.01em",
          }}
        >
          {vehicle.name}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "13px",
            marginBottom: "14px",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {vehicle.description}
        </p>

        {/* Specs row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "14px",
            paddingBottom: "14px",
            borderBottom: "1px solid var(--border-primary)",
          }}
        >
          {[
            { icon: <Users size={12} />, label: `${vehicle.seats} seats` },
            { icon: <Settings size={12} />, label: vehicle.transmission },
            { icon: <Fuel size={12} />, label: vehicle.fuel },
          ].map((spec) => (
            <span
              key={spec.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "12px",
                color: "var(--text-muted)",
                textTransform: "capitalize",
              }}
            >
              {spec.icon}
              {spec.label}
            </span>
          ))}
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            marginBottom: "18px",
          }}
        >
          {vehicle.features.slice(0, 3).map((f) => (
            <span
              key={f}
              style={{
                fontSize: "11px",
                fontWeight: 500,
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-secondary)",
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              {f}
            </span>
          ))}
          {vehicle.features.length > 3 && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                backgroundColor: "var(--bg-tertiary)",
                border: "1px solid var(--border-primary)",
                color: "var(--text-muted)",
                padding: "3px 8px",
                borderRadius: "6px",
              }}
            >
              +{vehicle.features.length - 3}
            </span>
          )}
        </div>

        {/* CTA */}
        <Link
          href={`/vehicles/${vehicle._id}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            backgroundColor: "var(--accent)",
            color: "white",
            fontSize: "13px",
            fontWeight: 600,
            padding: "11px",
            borderRadius: "10px",
            textDecoration: "none",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent)")
          }
        >
          Book Now <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}
