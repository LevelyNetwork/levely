import { describe, expect, it, vi } from "vitest"
import { createPost } from "@/lib/repositories/post-repository"

vi.mock("@/lib/prisma/client", () => ({
  __esModule: true,
  default: {
    post: {
      create: vi.fn().mockResolvedValue({ id: "1", content: "hola" }),
    },
  },
}))

describe("post repository", () => {
  it("creates posts", async () => {
    const result = await createPost({ content: "hola", author: { connect: { id: "1" } } })
    expect(result).toMatchObject({ id: "1" })
  })
})
