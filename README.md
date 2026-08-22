<div align="center">

# 🚗 Ryvo — Vehicle Booking Platform

**A full-stack vehicle rental platform with real payments, built for scale.**

Browse a curated fleet, filter by type and price, sign in with Google, book a vehicle, and pay securely via Stripe — all wrapped in a production-grade dark UI.

[![Live Demo](https://img.shields.io/badge/demo-ryvo--lux.vercel.app-FF2D55?style=for-the-badge&logo=vercel&logoColor=white)](https://ryvo-lux.vercel.app)
[![GitHub](https://img.shields.io/badge/source-github.com%2Flalman--dev%2Fryvo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lalman-dev/ryvo)

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Auth.js](https://img.shields.io/badge/Auth.js%20v5-000000?style=flat-square&logo=auth0&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## 📊 PageSpeed Insights

| Metric              |  Score  |
| ------------------- | :-----: |
| ⚡ Performance      | **100** |
| ♿ Accessibility    | **95**  |
| ✅ Best Practices   | **100** |
| 🔍 SEO              | **100** |
| 🤖 Agentic Browsing | **2/2** |

> Scores from [PageSpeed Insights](https://pagespeed.web.dev/) — a perfect Performance, Best Practices, and SEO score, with near-perfect Accessibility.

---

## ✨ Features

- 🚙 **Vehicle Catalog** — Sedans, SUVs, hatchbacks, bikes, vans, trucks, and luxury vehicles, with real-time filtering by type and price range
- 📅 **Full Booking Flow** — Select pickup/return dates and location, with live price calculation before confirming
- 💳 **Stripe Checkout** — Secure, hosted payment flow (test mode) with webhook-verified confirmation — bookings only confirm once payment actually succeeds
- 🔐 **Google OAuth + Email/Password** — Dual authentication via Auth.js v5 with JWT session strategy
- 📖 **My Bookings** — Authenticated users can view all past and upcoming bookings with live status and payment badges
- 🛡️ **Protected Routes** — Booking and checkout require authentication; unauthenticated users are redirected to login
- 🎨 **Dark / Light Theme** — Premium design system with a full theme toggle
- 💀 **Skeleton Loaders** — Every async state has a loading skeleton to prevent layout shift
- 🗂️ **Empty States** — Graceful UI for zero results and no bookings
- 📱 **Responsive Design** — Mobile-first layout across every page

---

## 🛠️ Tech Stack

| Layer         | Technology                 |
| ------------- | -------------------------- |
| 🧩 Framework  | Next.js 16 (App Router)    |
| 📘 Language   | TypeScript                 |
| 🎨 Styling    | Tailwind CSS v4            |
| 🎬 Animation  | Framer Motion              |
| 🗄️ Database   | MongoDB Atlas + Mongoose   |
| 🔑 Auth       | Auth.js v5 (Google OAuth)  |
| 💳 Payments   | Stripe Checkout + Webhooks |
| 🎯 Icons      | Lucide React               |
| ☁️ Deployment | Vercel                     |

---

## 🏗️ Architecture Decisions

**App Router with route groups**
Routes are organised into `(auth)` and `(root)` groups to separate authentication pages from main app pages without affecting URLs. Keeps layouts clean and makes it easy to add per-group middleware later.

**Server component for data fetching, client component for interactivity**
The vehicle detail page (`/vehicles/[id]`) is a server component that fetches vehicle data directly from MongoDB and passes it as props to a client component (`VehicleDetailClient`) that owns the booking form state. Avoids unnecessary API round trips on initial load while keeping the form interactive.

**Payment confirmation via webhook, not client redirect**
Bookings are created as `pending` and only flip to `confirmed` when Stripe's `checkout.session.completed` webhook fires — never on the client-side success redirect alone. This closes the gap where a user could land on a "success" URL without actually paying.

**Mongoose connection caching**
Next.js dev mode hot reloads create multiple MongoDB connections without caching. `lib/db.ts` caches the Mongoose connection on the global object to prevent connection pool exhaustion.

**JWT strategy over database sessions**
Auth.js is configured with `strategy: "jwt"` rather than database sessions, avoiding an extra DB read on every authenticated request while still exposing `user.id` in the session via the JWT callback.

**API route filtering with query params**
`/api/vehicles` accepts `?type=suv&minPrice=100&maxPrice=300` and builds the Mongoose query dynamically — filtering logic stays server-side instead of fetching everything and filtering on the client.

**Inline styles over Tailwind utility classes for theming**
Component styling uses inline `style` objects referencing CSS custom properties (`var(--accent)`, `var(--bg-secondary)`, etc.) rather than Tailwind's `bg-[var(--x)]` utility syntax, working around a Tailwind v4 runtime CSS-variable resolution issue. Variables are defined once in `@layer base`.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/                 # Login page
│   ├── (root)/
│   │   ├── vehicles/              # Listing + detail pages
│   │   └── bookings/
│   │       └── [id]/success/      # Post-payment confirmation page
│   ├── api/
│   │   ├── auth/                  # Auth.js handlers
│   │   ├── vehicles/              # GET with filtering
│   │   ├── bookings/              # POST + GET bookings
│   │   ├── checkout/              # Stripe Checkout session creation
│   │   ├── webhooks/stripe/       # Payment confirmation
│   │   └── seed/                  # Dev-only seed route
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                        # Navbar, SessionProvider
│   ├── vehicles/                  # VehicleCard, VehicleFilters, VehicleDetailClient
│   └── bookings/
├── lib/
│   ├── db.ts                      # MongoDB connection
│   ├── auth.ts                    # Auth.js config
│   ├── stripe.ts                  # Stripe client
│   └── seed.ts                    # Seed data
├── models/
│   ├── Vehicle.ts
│   └── Booking.ts
└── types/
    └── index.ts
```

---

## 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/lalman-dev/ryvo.git
cd ryvo
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env.local` file in the root:

```env
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
AUTH_SECRET=your_random_secret_string
NEXTAUTH_URL=http://localhost:3000

STRIPE_SECRET_KEY=your_stripe_test_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_test_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
```

**4. Set up Google OAuth**

- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new OAuth 2.0 Client ID
- Add `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI

**5. Set up Stripe webhooks (local)**

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET`.

**6. Seed the database**

```bash
npm run dev
# then visit http://localhost:3000/api/seed
```

**7. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🗺️ Roadmap

- [x] Email and password authentication
- [x] Extended vehicle catalog — bikes, vans, trucks, luxury fleet
- [x] Category filter capsules with per-type accent colors
- [x] Dark / light theme toggle with premium design system
- [x] Stripe payment integration (test mode)
- [ ] Booking cancellation
- [ ] Admin dashboard
- [ ] Real-time vehicle availability
- [ ] Driver dashboard
- [ ] Mobile app (React Native)

---

## 👤 Author

**Lalman** — Full-Stack Engineer, Frontend-Focused
[🌐 lalman.dev](https://lalman.dev) · [💻 github.com/lalman-dev](https://github.com/lalman-dev) · [🔗 linkedin.com/in/lalman-dev](https://linkedin.com/in/lalman-dev)
