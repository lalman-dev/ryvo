import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { auth, findById, create } = vi.hoisted(() => ({
  auth: vi.fn(),
  findById: vi.fn(),
  create: vi.fn(),
}));

vi.mock("@/lib/db", () => ({ connectDB: vi.fn() }));
vi.mock("@/lib/auth", () => ({ auth }));
vi.mock("@/models/Booking", () => ({ Booking: { findById, create } }));

import { POST } from "@/app/api/bookings/route";
import { PATCH } from "@/app/api/bookings/[id]/route";

const post = (body: unknown) =>
  new NextRequest("http://localhost/api/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });
const patch = () => new NextRequest("http://localhost/api/bookings/b1", { method: "PATCH" });
const ctx = { params: Promise.resolve({ id: "b1" }) };

beforeEach(() => {
  auth.mockReset();
  findById.mockReset();
  create.mockReset();
});

describe("POST /api/bookings", () => {
  it("requires authentication", async () => {
    auth.mockResolvedValue(null);
    expect((await POST(post({}))).status).toBe(401);
  });

  it("validates required fields", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    expect((await POST(post({ vehicleId: "v1" }))).status).toBe(400);
  });

  it("creates a pending booking for the signed-in user", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    create.mockResolvedValue({ _id: "b1" });
    const res = await POST(
      post({
        vehicleId: "v1",
        startDate: "2026-12-01",
        endDate: "2026-12-03",
        pickupLocation: "Dubai Marina",
        totalDays: 2,
        totalPrice: 400,
      }),
    );
    expect(res.status).toBe(201);
    expect(create.mock.calls[0][0]).toMatchObject({
      userId: "u1",
      status: "pending",
      paymentStatus: "pending",
    });
  });
});

describe("PATCH /api/bookings/[id] (cancel)", () => {
  it("requires authentication", async () => {
    auth.mockResolvedValue(null);
    expect((await PATCH(patch(), ctx)).status).toBe(401);
  });

  it("returns 404 for an unknown booking", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    findById.mockResolvedValue(null);
    expect((await PATCH(patch(), ctx)).status).toBe(404);
  });

  it("refuses to cancel another user's booking", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    const save = vi.fn();
    findById.mockResolvedValue({ userId: "someone-else", status: "pending", save });
    expect((await PATCH(patch(), ctx)).status).toBe(403);
    expect(save).not.toHaveBeenCalled();
  });

  it("cancels the owner's booking", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    const save = vi.fn();
    const booking = { userId: "u1", status: "pending", save };
    findById.mockResolvedValue(booking);
    const res = await PATCH(patch(), ctx);
    expect(res.status).toBe(200);
    expect(booking.status).toBe("cancelled");
    expect(save).toHaveBeenCalledOnce();
  });

  it("rejects cancelling an already cancelled booking", async () => {
    auth.mockResolvedValue({ user: { id: "u1" } });
    findById.mockResolvedValue({ userId: "u1", status: "cancelled", save: vi.fn() });
    expect((await PATCH(patch(), ctx)).status).toBe(400);
  });
});
