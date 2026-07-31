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

      router.push(`/bookings?success=true`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <span className="text-zinc-700">|</span>
          <span className="font-semibold text-white">{vehicle.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Vehicle info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Image */}
            <div className="relative h-72 rounded-2xl overflow-hidden mb-6 bg-zinc-800">
              <Image
                src={vehicle.image}
                alt={vehicle.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-semibold bg-blue-600 text-white px-3 py-1 rounded-full capitalize">
                  {vehicle.type}
                </span>
              </div>
            </div>

            {/* Name + price */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">
                  {vehicle.name}
                </h1>
                <p className="text-zinc-400">{vehicle.description}</p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="text-2xl font-bold text-blue-400">
                  AED {vehicle.pricePerDay}
                </span>
                <span className="text-zinc-500 text-sm block">/day</span>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-3 gap-3 mb-6">
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
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-center"
                >
                  <div className="text-blue-400 flex justify-center mb-1">
                    {spec.icon}
                  </div>
                  <div className="text-xs text-zinc-500 mb-0.5">
                    {spec.label}
                  </div>
                  <div className="text-sm font-semibold capitalize">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <h3 className="text-sm font-semibold text-zinc-300 mb-3">
                Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {vehicle.features.map((f) => (
                  <span
                    key={f}
                    className="flex items-center gap-1.5 text-sm bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle size={13} className="text-blue-400" />
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
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6">
                Book this vehicle
              </h2>

              <div className="space-y-4 mb-6">
                {/* Start date */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1.5">
                    <Calendar size={13} />
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* End date */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1.5">
                    <Calendar size={13} />
                    Return Date
                  </label>
                  <input
                    type="date"
                    min={startDate || today}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Pickup location */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-medium text-zinc-400 mb-1.5">
                    <MapPin size={13} />
                    Pickup Location
                  </label>
                  <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select location</option>
                    <option value="Dubai International Airport">
                      Dubai International Airport
                    </option>
                    <option value="Abu Dhabi Airport">Abu Dhabi Airport</option>
                    <option value="Downtown Dubai">Downtown Dubai</option>
                    <option value="Dubai Marina">Dubai Marina</option>
                    <option value="Abu Dhabi City Centre">
                      Abu Dhabi City Centre
                    </option>
                    <option value="Sharjah">Sharjah</option>
                  </select>
                </div>
              </div>

              {/* Price summary */}
              {totalDays > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-800 rounded-xl p-4 mb-5"
                >
                  <div className="flex justify-between text-sm text-zinc-400 mb-2">
                    <span>
                      AED {vehicle.pricePerDay} × {totalDays} day
                      {totalDays > 1 ? "s" : ""}
                    </span>
                    <span>AED {totalPrice}</span>
                  </div>
                  <div className="flex justify-between font-bold text-white border-t border-zinc-700 pt-2">
                    <span>Total</span>
                    <span className="text-blue-400">AED {totalPrice}</span>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleBooking}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-semibold py-3 rounded-xl transition-all"
              >
                {loading ? "Confirming..." : "Confirm Booking"}
              </button>

              <p className="text-xs text-zinc-500 text-center mt-3">
                You'll be redirected to sign in if not logged in
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
