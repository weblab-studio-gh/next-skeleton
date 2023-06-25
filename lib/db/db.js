const { PrismaClient } = require('@prisma/client');

const globalForPrisma = globalThis || window || global;
const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
