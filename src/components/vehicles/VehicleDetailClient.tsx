"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Fuel,
  Settings,
  ArrowLeft,
  CheckCircle,
  Calendar,
  MapPin,
} from "lucide-react";
import { Vehicle } from "@/types";

interface Props {
  vehicle: Vehicle;
}

const inputStyle = {
  width: "100%",
  backgroundColor: "var(--bg-tertiary)",
  border: "1px solid var(--border-primary)",
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "14px",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--text-muted)",
  marginBottom: "6px",
};

export default function VehicleDetailClient({ vehicle }: Props) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const totalDays =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(endDate).getTime() - new Date(startDate).getTime()) /
              (1000 * 60 * 60 * 24),
          ),
        )
      : 0;

  const totalPrice = totalDays * vehicle.pricePerDay;

  const handleBooking = async () => {
    if (!startDate || !endDate || !pickupLocation) {
      setError("Please fill in all fields.");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      setError("End date must be after start date.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: vehicle._id,
          startDate,
          endDate,
          pickupLocation,
          totalDays,
          totalPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error(data.error || "Booking failed");
      }
      router.push("/bookings?success=true");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      {/* Breadcrumb bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border-primary)",
          backgroundColor: "var(--bg-primary)",
          padding: "0 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            height: "52px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <button
            onClick={() => router.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--text-muted)",
              fontSize: "13px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px 10px",
              borderRadius: "8px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            <ArrowLeft size={14} />
            Fleet
          </button>
          <span style={{ color: "var(--border-secondary)" }}>›</span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {vehicle.name}
          </span>
        </div>
      </div>

      <div
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: "48px",
            alignItems: "start",
          }}
        >
          {/* Left — Vehicle info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <div
              style={{
                position: "relative",
                height: "320px",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: "28px",
                backgroundColor: "var(--bg-tertiary)",
              }}
            >
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)",
                }}
              />
              <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    backgroundColor: "var(--accent)",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "9999px",
                    textTransform: "capitalize",
                  }}
                >
                  {vehicle.type}
                </span>
              </div>
            </div>

            {/* Name + price */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}
            >
              <div style={{ flex: 1 }}>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    marginBottom: "6px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {vehicle.name}
                </h1>
                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                  }}
                >
                  {vehicle.description}
                </p>
              </div>
              <div
                style={{
                  textAlign: "right",
                  marginLeft: "24px",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  AED {vehicle.pricePerDay}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                  /day
                </div>
              </div>
            </div>

            {/* Specs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "28px",
              }}
            >
              {[
                {
                  icon: <Users size={16} />,
                  label: "Seats",
                  value: vehicle.seats,
                },
                {
                  icon: <Settings size={16} />,
                  label: "Transmission",
                  value: vehicle.transmission,
                },
                {
                  icon: <Fuel size={16} />,
                  label: "Fuel",
                  value: vehicle.fuel,
                },
              ].map((spec) => (
                <div
                  key={spec.label}
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-primary)",
                    borderRadius: "12px",
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      color: "var(--accent)",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "6px",
                    }}
                  >
                    {spec.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginBottom: "3px",
                    }}
                  >
                    {spec.label}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      textTransform: "capitalize",
                    }}
                  >
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--text-secondary)",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Features
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {vehicle.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "13px",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-secondary)",
                      padding: "6px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    <CheckCircle size={12} style={{ color: "var(--accent)" }} />
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Booking form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ position: "sticky", top: "80px" }}
          >
            <div
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
                borderRadius: "20px",
                padding: "28px",
              }}
            >
              <h2
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: "24px",
                }}
              >
                Book this vehicle
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                {/* Start date */}
                <div>
                  <label style={labelStyle}>
                    <Calendar size={12} /> Pickup Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-primary)")
                    }
                  />
                </div>

                {/* End date */}
                <div>
                  <label style={labelStyle}>
                    <Calendar size={12} /> Return Date
                  </label>
                  <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-primary)")
                    }
                  />
                </div>

                {/* Pickup location */}
                <div>
                  <label style={labelStyle}>
                    <MapPin size={12} /> Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--accent)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-primary)")
                    }
                  >
                    <option value="">Select location</option>
                    <option>Dubai International Airport</option>
                    <option>Abu Dhabi Airport</option>
                    <option>Downtown Dubai</option>
                    <option>Dubai Marina</option>
                    <option>Abu Dhabi City Centre</option>
                    <option>Sharjah</option>
                  </select>
                </div>
              </div>

              {/* Price summary */}
              {totalDays > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    backgroundColor: "var(--bg-tertiary)",
                    border: "1px solid var(--border-primary)",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      color: "var(--text-muted)",
                      marginBottom: "10px",
                    }}
                  >
                    <span>
                      AED {vehicle.pricePerDay} × {totalDays} day
                      {totalDays > 1 ? "s" : ""}
                    </span>
                    <span>AED {totalPrice}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontWeight: 700,
                      fontSize: "15px",
                      borderTop: "1px solid var(--border-primary)",
                      paddingTop: "10px",
                      color: "var(--text-primary)",
                    }}
                  >
                    <span>Total</span>
                    <span style={{ color: "var(--accent)" }}>
                      AED {totalPrice}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <div
                  style={{
                    backgroundColor: "var(--error-subtle)",
                    border: "1px solid var(--error)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "var(--error)",
                    marginBottom: "16px",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleBooking}
                disabled={loading}
                style={{
                  width: "100%",
                  backgroundColor: loading
                    ? "var(--bg-tertiary)"
                    : "var(--accent)",
                  color: loading ? "var(--text-muted)" : "white",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor =
                      "var(--accent-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    e.currentTarget.style.backgroundColor = "var(--accent)";
                }}
              >
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>

              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  textAlign: "center",
                  marginTop: "12px",
                }}
              >
                You'll be redirected to sign in if not logged in
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
