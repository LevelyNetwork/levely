import { test, expect } from "@playwright/test"

test("marketing page renders", async ({ page }) => {
  await page.goto("http://localhost:3000")
  await expect(page.getByRole("heading", { name: /construye tu reputación/i })).toBeVisible()
})
