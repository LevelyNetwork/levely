import "dotenv/config"
import prisma from "../lib/prisma/client"

export async function runSeed() {
  const demoUser = await prisma.userProfile.upsert({
    where: { email: "demo@levely.app" },
    update: {},
    create: {
      email: "demo@levely.app",
      username: "demo",
      bio: "Usuario demo para ambientes locales",
    },
  })

  await prisma.post.upsert({
    where: { id: "seed-post" },
    update: {},
    create: {
      id: "seed-post",
      content: "Bienvenido a Levely. Este post se creó desde scripts/seed.ts",
      authorId: demoUser.id,
    },
  })
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed()
    .then(() => {
      console.log("Seed ejecutada correctamente")
      return prisma.$disconnect()
    })
    .catch(async (error) => {
      console.error(error)
      await prisma.$disconnect()
      process.exit(1)
    })
}
