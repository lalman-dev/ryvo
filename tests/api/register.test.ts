import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const { findOne, create } = vi.hoisted(() => ({ findOne: vi.fn(), create: vi.fn() }));

vi.mock("@/lib/db", () => ({ connectDB: vi.fn() }));
vi.mock("@/models/User", () => ({ User: { findOne, create } }));

import { POST } from "@/app/api/auth/register/route";

const req = (body: unknown) =>
  new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

describe("POST /api/auth/register", () => {
  beforeEach(() => {
    findOne.mockReset();
    create.mockReset();
  });

  it("rejects missing fields", async () => {
    const res = await POST(req({ email: "a@b.com" }));
    expect(res.status).toBe(400);
  });

  it("rejects passwords shorter than 8 characters", async () => {
    const res = await POST(req({ name: "A", email: "a@b.com", password: "short" }));
    expect(res.status).toBe(400);
  });

  it("returns 409 when the email is already registered", async () => {
    findOne.mockResolvedValue({ _id: "1" });
    const res = await POST(req({ name: "A", email: "A@B.com", password: "longenough" }));
    expect(res.status).toBe(409);
    expect(findOne).toHaveBeenCalledWith({ email: "a@b.com" });
  });

  it("creates the user with a bcrypt-hashed password and lowercased email", async () => {
    findOne.mockResolvedValue(null);
    create.mockResolvedValue({});
    const res = await POST(req({ name: "A", email: "A@B.com", password: "longenough" }));
    expect(res.status).toBe(201);
    const saved = create.mock.calls[0][0];
    expect(saved.email).toBe("a@b.com");
    expect(saved.password).not.toBe("longenough");
    expect(saved.password).toMatch(/^\$2[aby]\$/);
  });
});
