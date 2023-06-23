'use server';
import { db } from '@/utils/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { processFormData, handleRelations } from '@/utils/_helpers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { sendNotification } from '@/utils/_helpers';

// TODO: Naming convention for some functions is not consistent
// TODO: Implement error handling
// TODO: Implement validation

async function columns() {
  const data = Prisma.dmmf.datamodel.models
    .find((model) => model.name === 'Product')
    .fields.filter((field) => {
      if (field.documentation !== 'hidden') {
        return true;
      }
      return false;
    });
  await db.$disconnect();
  return data;
}

async function findOne(id) {
  const data = await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      subCategory: true,
      supplier: true,
      image: true,
      gallery: true,
      ProductVariation: {
        include: {
          productVariationOptions: {
            include: {
              variationOption: true,
            },
          },
          variation: true,
        },
      },
    },
  });
  await db.$disconnect();
  return data;
}

async function create(data) {
  const { createData, file, files } = await processFormData(data);

  const {
    category,
    barcode,
    subCategory,
    gallery,
    supplier,
    variationValues,
    ...otherData
  } = createData;

  const variationData = JSON.parse(variationValues);
  if (barcode !== '') {
    otherData.barcode = barcode;
  }

  const filesArray = Array.isArray(files) ? files : [files];

  let result;

  try {
    await db.$connect();
    result = await db.$transaction(async (prisma) => {
      const product = await prisma.product.create({
        data: otherData,
      });

      if (variationData.lenght > 0 && variationData?.[0].variationId !== '') {
        for (const item of variationData) {
          await prisma.productVariation.upsert({
            where: {
              productId_variationId: {
                productId: product.id,
                variationId: item.variationId,
              },
            },
            create: {
              product: {
                connect: {
                  id: product.id,
                },
              },
              variation: {
                connect: {
                  id: item.variationId,
                },
              },
              productVariationOptions: {
                create: {
                  ...item.data,
                  variationOption: {
                    connect: {
                      id: item.attributeId,
                    },
                  },
                },
              },
            },
            update: {
              productVariationOptions: {
                create: {
                  ...item.data,
                  variationOption: {
                    connect: {
                      id: item.attributeId,
                    },
                  },
                },
              },
            },
          });
        }
      }

      category && (await handleRelations('product', 'category', product, category));
      subCategory &&
        (await handleRelations('product', 'subCategory', product, subCategory));
      supplier !== '' &&
        (await handleRelations('product', 'supplier', product, supplier));
      file.size > 0 &&
        (await handleRelations('product', 'image', product, file, 'create', true));
      filesArray[0]?.size > 0 &&
        (await handleRelations(
          'product',
          'gallery',
          product,
          filesArray,
          'create',
          true
        ));

      return product;
    });
  } catch (e) {
    console.error(e);
  } finally {
    await db.$disconnect();
  }

  revalidatePath('/dashboard/management/products/add');
  sendNotification({
    type: 'success',
    message: 'Product created successfully',
    title: 'Success',
  });

  return result;
}

async function update(data) {
  let {
    createData: updateData,
    file,
    files,
    requestData,
    removeGallery,
  } = await processFormData(data);
  const {
    category,
    removeCategory,
    subCategory,
    removeSubCategory,
    gallery,
    supplier,
    variationValues,
    variations,
    optionsToDelete,
    ...otherData
  } = updateData;

  const filesArray = Array.isArray(files) ? files : [files];
  let result;
  try {
    await db.$connect();
    result = await db.$transaction(async (prisma) => {
      let product = await prisma.product.update({
        where: {
          id: updateData.id,
        },
        data: otherData,
      });

      optionsToDelete &&
        (await prisma.productVariationOptions.deleteMany({
          where: {
            id: {
              in: JSON.parse(optionsToDelete),
            },
          },
        }));

      removeCategory &&
        (await handleRelations(
          'product',
          'category',
          product,
          removeCategory,
          'disconnect'
        ));
      removeSubCategory &&
        (await handleRelations(
          'product',
          'subCategory',
          product,
          removeSubCategory,
          'disconnect'
        ));
      if (JSON.parse(variationValues)[0].variationId !== '') {
        for (const item of JSON.parse(variationValues)) {
          await prisma.productVariation.upsert({
            where: {
              productId_variationId: {
                productId: product.id,
                variationId: item.variationId,
              },
            },
            create: {
              product: {
                connect: {
                  id: product.id,
                },
              },
              variation: {
                connect: {
                  id: item.variationId,
                },
              },
              productVariationOptions: {
                create: {
                  ...item.data,
                  variationOption: {
                    connect: {
                      id: item.attributeId,
                    },
                  },
                },
              },
            },
            update: {
              productVariationOptions: {
                create: {
                  ...item.data,
                  variationOption: {
                    connect: {
                      id: item.attributeId,
                    },
                  },
                },
              },
            },
          });
        }
      }
      removeGallery = removeGallery.split(',');
      category && (await handleRelations('product', 'category', product, category));
      subCategory &&
        (await handleRelations('product', 'subCategory', product, subCategory));
      supplier !== '' &&
        (await handleRelations('product', 'supplier', product, supplier, 'set'));
      file.size > 0 &&
        (await handleRelations('product', 'image', product, file, 'create', true));
      // filesArray[0].size > 0 &&
      //   (await handleRelations(
      //     'product',
      //     'gallery',
      //     product,
      //     filesArray,
      //     'create',
      //     true
      //   ));
      // removeGallery?.length > 0 &&
      //   (await handleRelations(
      //     'product',
      //     'gallery',
      //     product,
      //     removeGallery,
      //     'disconnect'
      //   ));

      // revalidatePath('/dashboard/management/products/[id]/page');
      // revalidate path id is the product id
      return product;
    });
  } catch (e) {
    console.error(e);
  } finally {
    await db.$disconnect();
  }

  revalidatePath(`/dashboard/management/products/[id]/`);
  sendNotification({
    type: 'success',
    message: 'Product updated successfully',
    title: 'Success',
  });

  return result;
}

async function findMany() {
  const products = await db.product.findMany({
    include: {
      category: true,
      subCategory: true,
      supplier: true,
      ProductVariation: true,
    },
  });
  await db.$disconnect();

  const sorted = products.sort((a, b) => b.createdAt - a.createdAt);
  return sorted;
}

async function deleteOne(id) {
  await db.product.delete({
    where: { id },
  });

  const data = await findMany();
  await db.$disconnect();
  return data;
}

async function deleteMany(ids) {
  await db.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  const data = await findMany();
  await db.$disconnect();
  return data;
}

async function getCategory() {
  const data = await db.productCategory.findMany({
    include: {
      type: true,
    },
  });
  await db.$disconnect();
  return data;
}

async function getSubCategory() {
  const data = await db.productSubCategory.findMany({
    include: {
      category: true,
    },
  });
  await db.$disconnect();
  return data;
}

async function getSupplier() {
  const data = await db.supplier.findMany();
  await db.$disconnect();
  return data;
}

async function getProductVariations() {
  return await db.productVariation.findMany();
}
async function getVariations() {
  const data = await db.variation.findMany({
    include: {
      variationOptions: {
        include: {
          _count: {
            select: {
              productVariationOptions: true,
            },
          },
        },
      },
    },
  });
  await db.$disconnect();
  return data;
}

async function getProductAttributes(productVariationId) {
  const data = await db.productAttribute.findMany({
    where: {
      id: productVariationId,
    },
  });
  await db.$disconnect();
  return data;
}

async function findFirst(p) {
  const data = await db.product.findFirst(p);
  await db.$disconnect();
  return data;
}
export {
  findFirst,
  columns,
  findMany,
  deleteOne,
  deleteMany,
  create,
  getCategory,
  getSubCategory,
  getSupplier,
  findOne,
  update,
  getVariations,
  getProductVariations,
  getProductAttributes,
};
