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
  ArrowLeft,
  Car,
} from "lucide-react";
import { Booking } from "@/types";

const STATUS_CONFIG = {
  confirmed: {
    label: "Confirmed",
    icon: <CheckCircle size={14} />,
    className: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  pending: {
    label: "Pending",
    icon: <Clock size={14} />,
    className: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  cancelled: {
    label: "Cancelled",
    icon: <XCircle size={14} />,
    className: "text-red-400 bg-red-400/10 border-red-400/20",
  },
};

export default function BookingsPage() {
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
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.push("/vehicles")}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back to Vehicles
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success banner */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl px-5 py-4 mb-8"
          >
            <CheckCircle size={18} />
            <div>
              <p className="font-semibold text-sm">Booking confirmed!</p>
              <p className="text-xs text-green-500 mt-0.5">
                Your vehicle has been reserved successfully.
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-1">My Bookings</h1>
          <p className="text-zinc-400 text-sm">
            {loading
              ? "Loading..."
              : `${bookings.length} booking${bookings.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        {/* States */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl h-36 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-24 text-red-400">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-24">
            <Car size={40} className="text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400 font-medium">No bookings yet</p>
            <p className="text-zinc-600 text-sm mt-1 mb-6">
              Find your perfect vehicle and book it in seconds
            </p>
            <button
              onClick={() => router.push("/vehicles")}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
            >
              Browse Vehicles
            </button>
          </div>
        ) : (
          <div className="space-y-4">
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
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-colors"
                >
                  <div className="flex gap-5 p-5">
                    {/* Vehicle image */}
                    <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                      {vehicle?.image && (
                        <Image
                          src={vehicle.image}
                          alt={vehicle.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <h3 className="font-bold text-white">
                            {vehicle?.name || "Vehicle"}
                          </h3>
                          <span className="text-xs text-zinc-500 capitalize">
                            {vehicle?.type}
                          </span>
                        </div>
                        <span
                          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${status.className}`}
                        >
                          {status.icon}
                          {status.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formatDate(booking.startDate)} →{" "}
                          {formatDate(booking.endDate)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} />
                          {booking.pickupLocation}
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <div className="text-blue-400 font-bold">
                        AED {booking.totalPrice}
                      </div>
                      <div className="text-zinc-500 text-xs mt-0.5">
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
