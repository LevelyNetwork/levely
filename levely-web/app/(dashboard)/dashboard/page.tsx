import { Suspense } from "react"
import { Button } from "@/components/ui/button"

function PlaceholderFeed() {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-left">
      <p className="text-sm text-slate-400">El feed en tiempo real llegará después de conectar Supabase.</p>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">Nivel 01 · 100 XP</p>
          <h1 className="text-3xl font-semibold text-white">Panel de creador</h1>
        </div>
        <Button disabled>Crear publicación</Button>
      </header>
      <Suspense fallback={<PlaceholderFeed />}>
        <PlaceholderFeed />
      </Suspense>
    </div>
  )
}
