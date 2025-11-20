"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export function subscribeToLikes(postId: string, onUpdate: (delta: number) => void) {
  const client = createClientComponentClient()
  const channel = client.channel(`likes-${postId}`)

  channel.on(
    "postgres_changes",
    { event: "INSERT", schema: "public", table: "Like", filter: `post_id=eq.${postId}` },
    () => onUpdate(1)
  )

  channel.on(
    "postgres_changes",
    { event: "DELETE", schema: "public", table: "Like", filter: `post_id=eq.${postId}` },
    () => onUpdate(-1)
  )

  channel.subscribe()

  return () => {
    channel.unsubscribe()
  }
}
