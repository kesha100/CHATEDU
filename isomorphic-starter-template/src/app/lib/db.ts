import { PrismaClient } from '@prisma/client';

// Instantiate the Prisma client
const prisma = new PrismaClient();

// Export the Prisma client as `db`
export const db = prisma;
