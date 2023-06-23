import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Seed product types
  const productTypes = await Promise.all([
    prisma.productType.create({
      data: {
        name: 'Digital Service',
      },
    }),
    prisma.productType.create({
      data: {
        name: 'Digital Product',
      },
    }),
    prisma.productType.create({
      data: {
        name: 'Service',
      },
    }),
    prisma.productType.create({
      data: {
        name: 'Product',
      },
    }),
  ]);

  // Seed categories
  const categories = await Promise.all(
    Array.from({ length: 5 }).map(async () => {
      return prisma.productCategory.create({
        data: {
          name: faker.commerce.department(),
        },
      });
    })
  );
  const variations = await Promise.all([
    prisma.variation.create({
      data: {
        name: 'Size',
      },
    }),
    prisma.variation.create({
      data: {
        name: 'Color',
      },
    }),
    prisma.variation.create({
      data: {
        name: 'Weight',
      },
    }),
  ]);

  // Seed variation options
  const sizeOptions = await Promise.all([
    prisma.variationOptions.create({
      data: {
        name: 'XXS',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'XS',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'S',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'M',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'L',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'XL',
        variation: {
          connect: {
            id: variations[0].id,
          },
        },
      },
    }),
  ]);

  const colorOptions = await Promise.all([
    prisma.variationOptions.create({
      data: {
        name: 'Blue',
        variation: {
          connect: {
            id: variations[1].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'Green',
        variation: {
          connect: {
            id: variations[1].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: 'Yellow',
        variation: {
          connect: {
            id: variations[1].id,
          },
        },
      },
    }),
  ]);

  const weightOptions = await Promise.all([
    prisma.variationOptions.create({
      data: {
        name: '1kg',
        variation: {
          connect: {
            id: variations[2].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: '5kg',
        variation: {
          connect: {
            id: variations[2].id,
          },
        },
      },
    }),
    prisma.variationOptions.create({
      data: {
        name: '10kg',
        variation: {
          connect: {
            id: variations[2].id,
          },
        },
      },
    }),
  ]);

  // Seed subcategories
  const subcategories = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      return prisma.productSubCategory.create({
        data: {
          name: faker.commerce.department(),
          category: {
            connect: {
              id: category.id,
            },
          },
        },
      });
    })
  );

  // // Seed products
  // const products = await Promise.all(
  //   Array.from({ length: 20 }).map(async () => {
  //     const subcategory = subcategories[Math.floor(Math.random() * subcategories.length)];
  //     const productType = subcategories[Math.floor(Math.random() * subcategories.length)];
  //     return prisma.product.create({
  //       data: {
  //         name: faker.commerce.productName(),
  //         description: faker.commerce.productDescription(),
  //         price: Math.floor(Math.random() * 1000),

  //         subCategory: {
  //           connect: {
  //             id: subcategory.id,
  //           },
  //         },
  //       },
  //     });
  //   })
  // );
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
