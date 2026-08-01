"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  CheckCircle,
  Clock,
  XCircle,
  Car,
} from "lucide-react";
import { Booking } from "@/types";

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: <CheckCircle size={13} />,
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={13} />,
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle size={13} />,
    color: "#F87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
  },
};

export default function BookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings");
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        const data = await res.json();
        setBookings(data.bookings || []);
      } catch {
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [router]);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-AE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
      }}
    >
      <div
        style={{ maxWidth: "800px", margin: "0 auto", padding: "48px 24px" }}
      >
        {/* Success banner */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "12px",
              padding: "14px 18px",
              marginBottom: "32px",
            }}
          >
            <CheckCircle
              size={18}
              style={{ color: "#22C55E", flexShrink: 0 }}
            />
            <div>
              <p
                style={{ fontWeight: 600, fontSize: "14px", color: "#22C55E" }}
              >
                Booking confirmed!
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#22C55E",
                  opacity: 0.8,
                  marginTop: "2px",
                }}
              >
                Your vehicle has been reserved successfully.
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: "6px",
              letterSpacing: "-0.02em",
            }}
          >
            My Bookings
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            {loading
              ? "Loading..."
              : `${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "16px",
                  height: "112px",
                  animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                }}
              />
            ))}
          </div>
        ) : error ? (
          <div
            style={{
              textAlign: "center",
              padding: "96px 24px",
              color: "var(--error)",
            }}
          >
            {error}
          </div>
        ) : bookings.length === 0 ? (
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
                fontWeight: 600,
                color: "var(--text-primary)",
                marginBottom: "6px",
              }}
            >
              No bookings yet
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--text-muted)",
                marginBottom: "24px",
              }}
            >
              Find your perfect vehicle and book it in seconds
            </p>
            <button
              onClick={() => router.push("/vehicles")}
              style={{
                backgroundColor: "var(--accent)",
                color: "white",
                fontWeight: 600,
                fontSize: "14px",
                padding: "11px 24px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent)")
              }
            >
              Browse Vehicles
            </button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {bookings.map((booking, i) => {
              const vehicle = booking.vehicleId as unknown as {
                name: string;
                image: string;
                type: string;
              };
              const status = STATUS_CONFIG[booking.status];

              return (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    border: "1px solid var(--border-primary)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor =
                      "var(--border-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor =
                      "var(--border-primary)")
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      padding: "18px 20px",
                      alignItems: "center",
                    }}
                  >
                    {/* Vehicle image */}
                    <div
                      style={{
                        position: "relative",
                        width: "96px",
                        height: "68px",
                        borderRadius: "10px",
                        overflow: "hidden",
                        backgroundColor: "var(--bg-tertiary)",
                        flexShrink: 0,
                      }}
                    >
                      {vehicle?.image && (
                        <Image
                          src={vehicle.image}
                          alt={vehicle.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          gap: "12px",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontWeight: 700,
                              fontSize: "15px",
                              color: "var(--text-primary)",
                              marginBottom: "2px",
                            }}
                          >
                            {vehicle?.name || "Vehicle"}
                          </h3>
                          <span
                            style={{
                              fontSize: "12px",
                              color: "var(--text-muted)",
                              textTransform: "capitalize",
                            }}
                          >
                            {vehicle?.type}
                          </span>
                        </div>
                        {/* Status badge */}
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: status.color,
                            backgroundColor: status.bg,
                            border: `1px solid ${status.border}`,
                            padding: "4px 10px",
                            borderRadius: "9999px",
                            flexShrink: 0,
                          }}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "16px",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <Calendar size={12} />
                          {formatDate(booking.startDate)} →{" "}
                          {formatDate(booking.endDate)}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "12px",
                            color: "var(--text-muted)",
                          }}
                        >
                          <MapPin size={12} />
                          {booking.pickupLocation}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: "16px",
                          color: "var(--accent)",
                        }}
                      >
                        AED {booking.totalPrice}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          marginTop: "2px",
                        }}
                      >
                        {booking.totalDays} day
                        {booking.totalDays > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
