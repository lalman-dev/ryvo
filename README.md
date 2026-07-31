# Ryvo — Vehicle Booking Platform

A full-stack vehicle booking platform built with Next.js 16, MongoDB, and Auth.js. Users can browse a curated vehicle catalog, filter by type and price, authenticate with Google, and manage bookings — all in a production-grade dark UI.

**Live Demo → [ryvo.vercel.app](https://ryvo.vercel.app)**  
**GitHub → [github.com/lalman-dev/ryvo](https://github.com/lalman-dev/ryvo)**

---

## Screenshots

> 

---

## Features

- **Vehicle Catalog** — Browse sedans, SUVs, hatchbacks, and luxury vehicles with real-time filtering by type and price range
- **Full Booking Flow** — Select dates, pickup location, and confirm booking with live price calculation
- **Google OAuth** — Secure authentication via Auth.js v5 with JWT session strategy
- **My Bookings** — Authenticated users can view all past and upcoming bookings with status badges
- **Protected Routes** — Booking creation requires authentication; unauthenticated users are redirected to login
- **Skeleton Loaders** — Every async state has a loading skeleton to maintain layout stability
- **Empty States** — Graceful UI for zero results and no bookings
- **Responsive Design** — Mobile-first layout across all pages

---

## Tech Stack

| Layer      | Technology                |
| ---------- | ------------------------- |
| Framework  | Next.js 16 (App Router)   |
| Language   | TypeScript                |
| Styling    | Tailwind CSS v4           |
| Animation  | Framer Motion             |
| Database   | MongoDB Atlas + Mongoose  |
| Auth       | Auth.js v5 (Google OAuth) |
| Icons      | Lucide React              |
| Deployment | Vercel                    |

---

## Architecture Decisions

**App Router with route groups**  
Routes are organised into `(auth)` and `(root)` groups to separate authentication pages from main app pages without affecting URLs. This keeps layouts clean and makes it easy to add per-group middleware later.

**Server component for data fetching, client component for interactivity**  
The vehicle detail page (`/vehicles/[id]`) is a server component that fetches vehicle data directly from MongoDB and passes it as props to a client component (`VehicleDetailClient`) that handles the booking form state. This avoids unnecessary API round trips for initial data while keeping the form interactive.

**Mongoose connection caching**  
Next.js dev mode hot reloads create multiple MongoDB connections without caching. The `lib/db.ts` utility caches the mongoose connection on the global object to prevent connection pool exhaustion.

**JWT strategy over database sessions**  
Auth.js is configured with `strategy: "jwt"` rather than database sessions. This avoids an extra DB read on every authenticated request while still exposing `user.id` in the session via the JWT callback.

**API route filtering with query params**  
The `/api/vehicles` route accepts `?type=suv&minPrice=100&maxPrice=300` query params and builds the Mongoose query dynamically. This keeps filtering logic server-side rather than fetching all vehicles and filtering on the client.

---

## Project Structure

```
src/
├── app/
│ ├── (auth)/
│ │ └── login/ # Login page
│ ├── (root)/
│ │ ├── vehicles/ # Listing + detail pages
│ │ └── bookings/ # My bookings page
│ ├── api/
│ │ ├── auth/ # Auth.js handlers
│ │ ├── vehicles/ # GET with filtering
│ │ ├── bookings/ # POST + GET bookings
│ │ └── seed/ # Dev-only seed route
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── ui/ # Navbar, SessionProvider
│ ├── vehicles/ # VehicleCard, VehicleFilters, VehicleDetailClient
│ └── bookings/ # (upcoming)
├── lib/
│ ├── db.ts # MongoDB connection
│ ├── auth.ts # Auth.js config
│ └── seed.ts # Seed data
├── models/
│ ├── Vehicle.ts
│ └── Booking.ts
└── types/
└── index.ts
```

---

## Getting Started

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
```

**4. Set up Google OAuth**

- Go to [Google Cloud Console](https://console.cloud.google.com)
- Create a new OAuth 2.0 Client ID
- Add `http://localhost:3000/api/auth/callback/google` as an authorised redirect URI

**5. Seed the database**

```bash
npm run dev
# Then visit http://localhost:3000/api/seed
```

**6. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Roadmap

- [ ] Email and password authentication
- [ ] Extended vehicle catalog — bikes, vans, trucks, luxury fleet
- [ ] Category filter capsules
- [ ] Dark / light theme toggle with premium design system
- [ ] Booking cancellation
- [ ] Admin dashboard
- [ ] Razorpay payment integration
- [ ] Real-time vehicle availability
- [ ] Driver dashboard

---

## Author

**Lalman** — Full-Stack Engineer, Frontend-Focused  
[lalman.dev](https://lalman.dev) · [github.com/lalman-dev](https://github.com/lalman-dev) · [linkedin.com/in/lalman-dev](https://linkedin.com/in/lalman-dev)
