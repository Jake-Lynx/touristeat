import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = (): PrismaClient => new PrismaClient();

// Étendre le type de `globalThis` pour inclure Prisma
interface GlobalPrisma {
  prisma?: PrismaClient;
}

const globalForPrisma = globalThis as unknown as GlobalPrisma;

// Réutilisation de l'instance Prisma en dev pour éviter les instanciations multiples
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
