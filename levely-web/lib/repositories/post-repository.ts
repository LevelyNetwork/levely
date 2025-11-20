import type { Prisma, PrismaClient } from "@prisma/client"
import prisma from "@/lib/prisma/client"

type DbClient = PrismaClient | Prisma.TransactionClient

const getClient = (client?: DbClient) => client ?? prisma

export type FeedFilters = {
  limit?: number
  cursor?: string | null
}

export async function createPost(data: Prisma.PostCreateInput, client?: DbClient) {
  return getClient(client).post.create({
    data,
    include: { author: true, likes: true },
  })
}

export async function getFeed({ limit = 20, cursor }: FeedFilters, client?: DbClient) {
  return getClient(client).post.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    include: {
      author: true,
      likes: true,
    },
  })
}

export async function toggleLike(postId: string, userId: string, client?: DbClient) {
  const db = getClient(client)
  const existing = await db.like.findUnique({
    where: { userId_postId: { userId, postId } },
  })

  if (existing) {
    await db.like.delete({ where: { userId_postId: { userId, postId } } })
    return { liked: false }
  }

  await db.like.create({ data: { postId, userId } })
  return { liked: true }
}
