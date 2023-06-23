import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient();

async function main() {
  try {
    await db.$connect();

    // Perform database operations here
  } catch (e) {
    console.error(e);
  }
}

main();
