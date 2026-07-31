"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Car, BookOpen, LogOut, LogIn } from "lucide-react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          ryvo<span className="text-blue-500">.</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-2">
          <Link
            href="/vehicles"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800"
          >
            <Car size={15} />
            Vehicles
          </Link>

          {status === "authenticated" && (
            <Link
              href="/bookings"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800"
            >
              <BookOpen size={15} />
              My Bookings
            </Link>
          )}

          {status === "loading" && (
            <div className="w-8 h-8 rounded-full bg-zinc-800 animate-pulse" />
          )}

          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-3 ml-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full border border-zinc-700"
                />
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-sm text-zinc-400 hover:text-red-400 transition-colors px-3 py-2 rounded-lg hover:bg-zinc-800"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          ) : status === "unauthenticated" ? (
            <button
              onClick={() => signIn("google", { callbackUrl: "/vehicles" })}
              className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors font-medium ml-2"
            >
              <LogIn size={15} />
              Sign In
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
