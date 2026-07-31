"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl mb-4">
            <Car size={26} className="text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            ryvo<span className="text-blue-500">.</span>
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Sign in to book your vehicle
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-2">
            Welcome back
          </h2>
          <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
            Sign in with your Google account to access bookings, manage
            reservations, and more.
          </p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/vehicles" })}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-100 text-zinc-900 font-semibold py-3 rounded-xl transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"
              />
              <path
                fill="#34A853"
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"
              />
              <path
                fill="#FBBC05"
                d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"
              />
              <path
                fill="#EA4335"
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-xs text-zinc-500 text-center mt-4">
            By signing in you agree to our terms of service
          </p>
        </div>

        <p className="text-center mt-6">
          <a
            href="/vehicles"
            className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            ← Browse vehicles without signing in
          </a>
        </p>
      </motion.div>
    </main>
  );
}
