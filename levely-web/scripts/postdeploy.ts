import { execSync } from "node:child_process"
import { runSeed } from "./seed"
import prisma from "../lib/prisma/client"

async function main() {
  execSync("pnpm prisma:migrate:deploy", { stdio: "inherit" })
  await runSeed()
  await prisma.$disconnect()
}

main().catch(async (error) => {
  console.error(error)
  await prisma.$disconnect()
  process.exit(1)
})
