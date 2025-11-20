"use server"

import { revalidatePath } from "next/cache"
import type { Prisma } from "@prisma/client"
import prisma from "@/lib/prisma/client"
import { createPostSchema, type CreatePostInput } from "@/lib/validations/post"
import { createPost, toggleLike } from "@/lib/repositories/post-repository"
import { XP_RULES, calculateLevel } from "@/lib/xp/calc"

export async function createPostAction(userId: string, payload: CreatePostInput) {
  const parsed = createPostSchema.safeParse(payload)

  if (!parsed.success) {
    throw new Error(parsed.error.message)
  }

  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const post = await createPost({ ...parsed.data, author: { connect: { id: userId } } }, tx)

    const updated = await tx.userProfile.update({
      where: { id: userId },
      data: { xp: { increment: XP_RULES.CREATE_POST } },
    })

    const level = calculateLevel(updated.xp)
    if (level !== updated.level) {
      await tx.userProfile.update({ where: { id: userId }, data: { level } })
    }

    return post
  })

  revalidatePath("/")
}

export async function toggleLikeAction(postId: string, userId: string) {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const { liked } = await toggleLike(postId, userId, tx)

    if (liked) {
      const post = await tx.post.findUnique({ where: { id: postId }, select: { authorId: true } })
      if (post?.authorId) {
        await tx.userProfile.update({
          where: { id: post.authorId },
          data: { xp: { increment: XP_RULES.RECEIVE_LIKE } },
        })
      }
    }
  })

  revalidatePath("/")
}
