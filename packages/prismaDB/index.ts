import { PrismaClient } from "./generated/prisma";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Don't instantiate Prisma client during Next.js build process
const isPrismaClientSafe = () => {
  // Skip Prisma client instantiation during build if DATABASE_URL is placeholder
  if (process.env.DATABASE_URL?.includes('placeholder')) {
    return false;
  }
  // Skip during Next.js build phase
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return false;
  }
  return true;
};

export const prisma = globalForPrisma.prisma || (isPrismaClientSafe() ? new PrismaClient() : null as any);

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
