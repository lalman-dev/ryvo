"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Car, BookOpen, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-(--border-primary) bg-(--bg-primary)/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-(--text-primary)"
        >
          ryvo<span className="text-(--accent)">.</span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <Link
            href="/vehicles"
            className="flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors px-3 py-2 rounded-xl hover:bg-(--bg-tertiary)"
          >
            <Car size={15} />
            Vehicles
          </Link>

          {status === "authenticated" && (
            <Link
              href="/bookings"
              className="flex items-center gap-2 text-sm text-(--text-secondary) hover:text-(--text-primary) transition-colors px-3 py-2 rounded-xl hover:bg-(--bg-tertiary)"
            >
              <BookOpen size={15} />
              My Bookings
            </Link>
          )}

          <div className="w-px h-5 bg-(--border-primary) mx-2" />

          <ThemeToggle />

          {status === "loading" && (
            <div className="w-8 h-8 rounded-full bg-(--bg-tertiary) animate-pulse ml-2" />
          )}

          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-2 ml-2">
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={30}
                  height={30}
                  className="rounded-full border border-(--border-primary)"
                />
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-2 text-sm text-(--text-muted) hover:text-(--error) transition-colors px-3 py-2 rounded-xl hover:bg-(--bg-tertiary)"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          ) : status === "unauthenticated" ? (
            <button
              onClick={() => signIn("google", { callbackUrl: "/vehicles" })}
              className="flex items-center gap-2 text-sm bg-(--accent) hover:bg-(--accent-hover) text-white px-4 py-2 rounded-xl transition-colors font-medium ml-2"
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
