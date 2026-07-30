import Link from "next/link";
import { ArrowRight, MapPin, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">
            ryvo<span className="text-blue-500">.</span>
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/vehicles"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Browse Vehicles
            </Link>
            <Link
              href="/login"
              className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm px-4 py-1.5 rounded-full mb-8">
            <Zap size={14} />
            Instant booking confirmation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Drive anything.
            <br />
            <span className="text-blue-500">Book in seconds.</span>
          </h1>

          <p className="text-lg text-zinc-400 max-w-xl mx-auto mb-10 leading-relaxed">
            Premium vehicles at your fingertips. From city hatchbacks to luxury
            sedans — book the right car for every occasion.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/vehicles"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold transition-all hover:gap-3"
            >
              Browse Vehicles <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 rounded-xl font-semibold border border-zinc-700 hover:border-zinc-500 transition-colors text-zinc-300"
            >
              Sign in with Google
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap size={22} className="text-blue-400" />,
              title: "Instant Booking",
              desc: "Confirm your vehicle in under 60 seconds. No paperwork, no waiting.",
            },
            {
              icon: <Shield size={22} className="text-blue-400" />,
              title: "Fully Insured",
              desc: "Every vehicle comes with comprehensive coverage. Drive with confidence.",
            },
            {
              icon: <MapPin size={22} className="text-blue-400" />,
              title: "Flexible Pickup",
              desc: "Choose your pickup location. We'll have your vehicle ready and waiting.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-colors"
            >
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to hit the road?</h2>
          <p className="text-zinc-400 mb-8">
            Join thousands of drivers who book smarter with Ryvo.
          </p>
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold transition-all"
          >
            Browse Vehicles <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6 text-center text-zinc-500 text-sm">
        © 2026 Ryvo. Built with Next.js & MongoDB.
      </footer>
    </main>
  );
}
