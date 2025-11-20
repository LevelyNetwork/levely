import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Levely | Crece con XP",
  description:
    "MVP en progreso para una red social gamificada con Supabase y Server Actions.",
}

export default function MarketingHome() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">MVP Build</p>
      <h1 className="text-balance text-4xl font-semibold text-white sm:text-5xl">
        Construye tu reputación social subiendo de nivel con cada aporte
      </h1>
      <p className="text-pretty text-base text-slate-400 sm:text-lg">
        Levely combina Supabase Realtime, Server Actions y métricas de XP para dar visibilidad instantánea a las mejores
        contribuciones. Este MVP muestra la estructura base sobre la que seguiremos iterando.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link href="/dashboard">Ir al dashboard</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/docs">Ver documentación</Link>
        </Button>
      </div>
    </section>
  )
}
