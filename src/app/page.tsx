import Link from "next/link";
import { ArrowRight, MapPin, Shield, Zap, Star } from "lucide-react";

export default function HomePage() {
  return (
    <main
      style={{
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        minHeight: "100vh",
      }}
    >
      {/* Hero */}
      <section
        style={{
          position: "relative",
          paddingTop: "96px",
          paddingBottom: "96px",
          paddingLeft: "24px",
          paddingRight: "24px",
          overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            style={{
              position: "absolute",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "600px",
              height: "400px",
              backgroundColor: "var(--accent)",
              opacity: 0.06,
              borderRadius: "9999px",
              filter: "blur(120px)",
            }}
          />
        </div>

        <div
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--accent-subtle)",
              border: "1px solid var(--accent-border)",
              color: "var(--accent)",
              fontSize: "11px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "9999px",
              marginBottom: "32px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            <Star size={11} fill="currentColor" />
            Premium Vehicle Booking
          </div>

          <h1
            style={{
              fontSize: "clamp(40px, 7vw, 80px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              marginBottom: "24px",
              color: "var(--text-primary)",
            }}
          >
            Drive anything.
            <br />
            <span style={{ color: "var(--accent)" }}>Book in seconds.</span>
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "var(--text-secondary)",
              maxWidth: "480px",
              margin: "0 auto 40px",
              lineHeight: 1.7,
            }}
          >
            Premium vehicles at your fingertips. From city hatchbacks to luxury
            sedans — book the right car for every occasion.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/vehicles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--accent)",
                color: "white",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                transition: "background-color 0.2s",
              }}
            >
              Browse Fleet <ArrowRight size={16} />
            </Link>
            <Link
              href="/login"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "14px 28px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                border: "1px solid var(--border-primary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-secondary)",
                transition: "all 0.2s",
              }}
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          borderTop: "1px solid var(--border-primary)",
          borderBottom: "1px solid var(--border-primary)",
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "32px",
            textAlign: "center",
          }}
        >
          {[
            { value: "200+", label: "Vehicles Available" },
            { value: "50K+", label: "Bookings Completed" },
            { value: "4.9★", label: "Average Rating" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "4px",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "12px",
              }}
            >
              Why choose Ryvo?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                maxWidth: "380px",
                margin: "0 auto",
              }}
            >
              Built for people who expect more than just a rental.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              {
                icon: <Zap size={20} />,
                title: "Instant Booking",
                desc: "Confirm your vehicle in under 60 seconds. No paperwork, no waiting.",
              },
              {
                icon: <Shield size={20} />,
                title: "Fully Insured",
                desc: "Every vehicle comes with comprehensive coverage. Drive with confidence.",
              },
              {
                icon: <MapPin size={20} />,
                title: "Flexible Pickup",
                desc: "Choose your pickup location. We'll have your vehicle ready.",
              },
            ].map((f) => (
              <div
                key={f.title}
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-primary)",
                  borderRadius: "16px",
                  padding: "24px",
                  transition: "border-color 0.2s",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--accent-subtle)",
                    border: "1px solid var(--accent-border)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                    color: "var(--accent)",
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
              borderRadius: "24px",
              padding: "64px 48px",
              textAlign: "center",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "320px",
                height: "160px",
                backgroundColor: "var(--accent)",
                opacity: 0.05,
                borderRadius: "9999px",
                filter: "blur(60px)",
                pointerEvents: "none",
              }}
            />
            <h2
              style={{
                fontSize: "32px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "12px",
                position: "relative",
              }}
            >
              Ready to hit the road?
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                marginBottom: "32px",
                position: "relative",
              }}
            >
              Join thousands of drivers who book smarter with Ryvo.
            </p>
            <Link
              href="/vehicles"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--accent)",
                color: "white",
                padding: "14px 32px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
                position: "relative",
              }}
            >
              Browse Fleet <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid var(--border-primary)",
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
            ryvo<span style={{ color: "var(--accent)" }}>.</span>
          </span>
          <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>
            © 2026 Ryvo. Built with Next.js & MongoDB.
          </span>
        </div>
      </footer>
    </main>
  );
}
