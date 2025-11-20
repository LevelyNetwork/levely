import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/unit/**/*.ts", "tests/integration/**/*.ts"],
    environment: "node",
  },
})
