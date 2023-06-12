import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 1000; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: String(faker.commerce.price()),
        image: faker.image.avatarGitHub(),
        description: faker.commerce.productDescription(),
        quantity: faker.word.adverb(),
        barcode: faker.word.adverb(),
      },
    });
  }
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
