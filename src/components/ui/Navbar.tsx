"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Car, BookOpen, LogOut, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderBottom: "1px solid var(--border-primary)",
        backgroundColor: "var(--bg-primary)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "var(--text-primary)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          ryvo<span style={{ color: "var(--accent)" }}>.</span>
        </Link>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {/* Vehicles link */}
          <Link
            href="/vehicles"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: 500,
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "7px 12px",
              borderRadius: "10px",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-primary)";
              e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            <Car size={14} />
            Vehicles
          </Link>

          {/* My Bookings — authenticated only */}
          {status === "authenticated" && (
            <Link
              href="/bookings"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 500,
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "7px 12px",
                borderRadius: "10px",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.backgroundColor = "var(--bg-tertiary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-secondary)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <BookOpen size={14} />
              My Bookings
            </Link>
          )}

          {/* Divider */}
          <div
            style={{
              width: "1px",
              height: "20px",
              backgroundColor: "var(--border-primary)",
              margin: "0 8px",
            }}
          />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Loading skeleton */}
          {status === "loading" && (
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--bg-tertiary)",
                marginLeft: "8px",
                animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
              }}
            />
          )}

          {/* Authenticated */}
          {status === "authenticated" && session?.user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "8px",
              }}
            >
              {session.user.image && (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={30}
                  height={30}
                  style={{
                    borderRadius: "50%",
                    border: "1px solid var(--border-primary)",
                  }}
                />
              )}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--text-muted)",
                  padding: "7px 12px",
                  borderRadius: "10px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--error)";
                  e.currentTarget.style.backgroundColor = "var(--error-subtle)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}

          {/* Unauthenticated */}
          {status === "unauthenticated" && (
            <button
              onClick={() => signIn("google", { callbackUrl: "/vehicles" })}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: "var(--accent)",
                color: "white",
                padding: "8px 16px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                marginLeft: "8px",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--accent)")
              }
            >
              <LogIn size={14} />
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
