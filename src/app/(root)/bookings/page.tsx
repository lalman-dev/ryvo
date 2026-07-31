import { Suspense } from "react";
import BookingsContent from "@/components/bookings/BookingsContent";

export default function BookingsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-zinc-950 text-white">
          <div className="max-w-4xl mx-auto px-6 py-12">
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl h-36 animate-pulse"
                />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <BookingsContent />
    </Suspense>
  );
}
