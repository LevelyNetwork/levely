import { describe, expect, it } from "vitest"
import { calculateLevel, xpAfterAction, XP_RULES } from "@/lib/xp/calc"

describe("xp calculator", () => {
  it("increments XP using the configured table", () => {
    expect(xpAfterAction(0, "CREATE_POST")).toBe(100)
    expect(xpAfterAction(100, "RECEIVE_LIKE")).toBe(101)
  })

  it("computes the level curve", () => {
    expect(calculateLevel(0)).toBe(1)
    expect(calculateLevel(100)).toBeGreaterThanOrEqual(2)
    expect(XP_RULES.CREATE_POST).toBe(100)
  })
})
