import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { auth, findById, sessionsCreate } = vi.hoisted(() => ({
  auth: vi.fn(),
  findById: vi.fn(),
  sessionsCreate: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ connectDB: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth }));
vi.mock("@/lib/stripe", () => ({ stripe: { checkout: { sessions: { create: sessionsCreate } } } }));
vi.mock("@/models/Booking", () => ({
  Booking: { findById: () => ({ populate: findById }) },
}));

import { POST } from "@/app/api/checkout/route";

const req = (body: unknown) =>
  new NextRequest("http://localhost/api/checkout", { method: "POST", body: JSON.stringify(body) });

beforeEach(() => {
  auth.mockReset();
  findById.mockReset();
  sessionsCreate.mockReset();
});

describe("POST /api/checkout", () => {
  it("requires authentication", async () => {
    auth.mockResolvedValue(null);
    expect((await POST(req({ bookingId: "b1" }))).status).toBe(401);
  });

  it("blocks paying for someone else's booking", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    findById.mockResolvedValue({ userId: "u2", paymentStatus: "pending" });
    expect((await POST(req({ bookingId: "b1" }))).status).toBe(403);
    expect(sessionsCreate).not.toHaveBeenCalled();
  });

  it("blocks paying twice", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    findById.mockResolvedValue({ userId: "u1", paymentStatus: "paid" });
    expect((await POST(req({ bookingId: "b1" }))).status).toBe(400);
  });

  it("creates a Stripe session in AED for the booking total", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    const save = vi.fn();
    findById.mockResolvedValue({
      _id: { toString: () => "b1" },
      userId: "u1",
      paymentStatus: "pending",
      totalDays: 2,
      totalPrice: 400,
      vehicleId: { _id: "v1", name: "Audi A4" },
      save,
    });
    sessionsCreate.mockResolvedValue({ id: "cs_1", url: "https://stripe.test/pay" });
    const res = await POST(req({ bookingId: "b1" }));
    expect(res.status).toBe(200);
    const args = sessionsCreate.mock.calls[0][0];
    expect(args.line_items[0].price_data.currency).toBe("aed");
    expect(args.line_items[0].price_data.unit_amount).toBe(40000);
    expect(save).toHaveBeenCalled();
  });
});
