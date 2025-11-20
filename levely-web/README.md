## Levely Web

MVP en Next.js 15 (App Router) con Supabase/Postgres, Prisma 5.20, Tailwind v4 y shadcn/ui. Esta app concentra frontend y backend (Server Actions + API Routes) siguiendo la estructura definida en `estructura_carpetas_frontend_backend.txt`.

### Requerimientos

- Node.js 20+
- pnpm 9+
- Base de datos Postgres (local o Supabase)

### Configuración

1. Copia `.env.local.example` en `.env.local` y completa las claves de Supabase/Prisma.
2. Instala dependencias:

```bash
pnpm install
```

3. Genera el cliente de Prisma y aplica migraciones:

```bash
pnpm prisma:generate
pnpm prisma:migrate:dev --name init
```

4. Ejecuta el seed opcional:

```bash
pnpm seed:dev
```

5. Arranca el servidor de desarrollo:

```bash
pnpm dev
```

### Scripts útiles

- `pnpm lint` – Next.js lint
- `pnpm test` – Vitest (unit + integration)
- `pnpm test:e2e` – Playwright
- `pnpm prisma:migrate:deploy` – migraciones en producción
- `pnpm postdeploy` – migraciones + seed tras un deploy

### CI/CD

El workflow `levely-ci` ejecuta lint, tests y validaciones de Prisma en cada PR a `main`. Ajusta los secrets `DATABASE_URL` y `NEXT_PUBLIC_SUPABASE_URL` en GitHub Actions para entornos reales.
