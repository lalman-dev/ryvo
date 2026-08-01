"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Car } from "lucide-react";

export default function LoginPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%", maxWidth: "420px" }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              backgroundColor: "var(--accent-subtle)",
              border: "1px solid var(--accent-border)",
              borderRadius: "16px",
              marginBottom: "16px",
            }}
          >
            <Car size={24} style={{ color: "var(--accent)" }} />
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
            }}
          >
            ryvo<span style={{ color: "var(--accent)" }}>.</span>
          </h1>
          <p
            style={{
              color: "var(--text-muted)",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            Sign in to book your vehicle
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "var(--bg-secondary)",
            border: "1px solid var(--border-primary)",
            borderRadius: "20px",
            padding: "32px",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Welcome back
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "14px",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            Sign in with your Google account to access bookings, manage
            reservations, and more.
          </p>

          {/* Google button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/vehicles" })}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              backgroundColor: "#ffffff",
              color: "#1a1a2e",
              fontWeight: 600,
              fontSize: "14px",
              padding: "13px",
              borderRadius: "12px",
              border: "1px solid var(--border-primary)",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#f4f4f4")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ffffff")
            }
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

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              margin: "20px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--border-primary)",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
                fontWeight: 500,
              }}
            >
              or
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "var(--border-primary)",
              }}
            />
          </div>

          {/* Email placeholder — Session 9 */}
          <div
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px dashed var(--border-secondary)",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Email & password login coming soon
            </p>
          </div>

          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            By signing in you agree to our terms of service
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          <a
            href="/vehicles"
            style={{
              fontSize: "13px",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            ← Browse vehicles without signing in
          </a>
        </p>
      </motion.div>
    </main>
  );
}
