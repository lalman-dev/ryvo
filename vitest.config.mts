import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "src") } },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    env: { MONGODB_URI: "mongodb://localhost:27017/test", STRIPE_SECRET_KEY: "sk_test_x" },
  },
});
