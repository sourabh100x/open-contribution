import { PrismaClient } from '@prisma/client';

// Extend the global object in TypeScript to include a cached PrismaClient instance
declare global {
  // This will prevent TypeScript from complaining about `global.prisma`
  var prisma: PrismaClient | undefined;
}

// Instantiate Prisma client
const prisma = global.prisma || new PrismaClient();

// In development, enable global caching of the Prisma instance to avoid multiple connections
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
