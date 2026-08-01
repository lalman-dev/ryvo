import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/ui/SessionProvider";
import ThemeProvider from "@/components/ui/ThemeProvider";
import Navbar from "@/components/ui/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ryvo — Premium Vehicle Booking",
  description:
    "Book premium vehicles instantly. Sedans, SUVs, luxury cars, bikes and more.",
  keywords: ["vehicle booking", "car rental", "UAE", "Dubai", "Abu Dhabi"],
  openGraph: {
    title: "Ryvo — Premium Vehicle Booking",
    description: "Book premium vehicles instantly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <SessionProvider>
            <Navbar />
            <div style={{ paddingTop: "64px" }}>{children}</div>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
