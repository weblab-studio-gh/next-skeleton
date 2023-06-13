import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();
async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        price: String(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        quantity: faker.word.adverb(),
        barcode: faker.word.adverb(),
      },
    });
  }
  for (let i = 0; i < 10; i++) {
    await prisma.productCategory.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      },
    });
    await prisma.productSubCategory.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
      },
    });
    await prisma.productSupplier.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
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
