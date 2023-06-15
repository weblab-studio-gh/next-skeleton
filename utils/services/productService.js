'use server';
import { db } from '@/utils/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { processFormData, handleRelations } from '@/utils/_helpers';

// TODO: Naming convention for some functions is not consistent
// TODO: Implement error handling
// TODO: Implement validation
// TODO: Implement variable products
// TODO: https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#create-a-single-record-and-multiple-related-records
// TODO: Rework the connections to use the above link

async function columns() {
  return Prisma.dmmf.datamodel.models
    .find((model) => model.name === 'Product')
    .fields.filter((field) => {
      if (field.documentation !== 'hidden') {
        return true;
      }
      return false;
    });
}

async function findOne(id) {
  return await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      subCategory: true,
      supplier: true,
      image: true,
      gallery: true,
    },
  });
}

async function create(data) {
  // If data is not FormData, object will be passed
  const { createData, file, files } = await processFormData(data);

  const { category, subCategory, gallery, supplier, variationValues, ...otherData } =
    createData;
  // processCreateSupplier(requestData, otherData); // Save and connect supplier
  const workingData = JSON.parse(variationValues);

  const filesArray = Array.isArray(files) ? files : [files]; // File is not always an array
  // Save model relations
  const returnProduct = await db.$transaction(async () => {
    const product = await db.product.create({
      // need the product for the ID
      data: otherData,
    });

    for (const item of workingData) {
      await db.productVariation
        .upsert({
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
                name: item.data.name,
              },
            },
          },
          update: {
            productVariationOptions: {
              create: {
                name: item.data.name,
              },
            },
          },
        })
        .catch((err) => console.log(err));
    }
    category &&
      // Check if category selected.
      (await handleRelations('product', 'category', product, category));
    subCategory &&
      // Check if subCategory selected.
      (await handleRelations('product', 'subCategory', product, subCategory));
    supplier !== '' &&
      // check if supplier selected
      (await handleRelations('product', 'supplier', product, supplier));
    file.size > 0 &&
      // Check if image selected.
      (await handleRelations('product', 'image', product, file, 'create', true));
    filesArray[0].size > 0 &&
      // Check if gallery selected.
      (await handleRelations('product', 'gallery', product, filesArray, 'create', true));
  });

  return returnProduct;
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
    ...otherData
  } = updateData;

  // processSupplier(requestData, otherData); // Save supplier

  const filesArray = Array.isArray(files) ? files : [files];
  let returnProduct = await db.$transaction(async () => {
    let product = await db.product.update({
      where: {
        id: updateData.id,
      },
      data: otherData,
    });
    removeGallery = removeGallery.split(',');
    category &&
      // Check if category selected.product
      (await handleRelations('product', 'category', product, category));
    subCategory &&
      // Check if subCategory selected.
      (await handleRelations('product', 'subCategory', product, subCategory));
    supplier !== '' &&
      // check if supplier selected
      (await handleRelations('product', 'supplier', product, supplier, 'set'));
    file.size > 0 &&
      // Check if image selected.product
      (await handleRelations('product', 'image', product, file, 'create', true));
    // prettier-ignore
    filesArray[0].size > 0 &&
      // Check if gallery selected.
      (await handleRelations('product', 'gallery', product, filesArray, 'create', true));
    // prettier-ignore
    removeGallery?.length > 0 &&
      // Check if gallery selected.
      (await handleRelations('product', 'gallery', product, removeGallery, 'disconnect'));
    // prettier-ignore
    removeCategory &&
      // Check if category selected.
      (await handleRelations('product', 'category', product, removeCategory, 'disconnect'));
    // prettier-ignore
    removeSubCategory &&
      // Check if subCategory selected.
      (await handleRelations('product', 'subCategory', product, removeSubCategory, 'disconnect'));
    // prettier-ignore
  });
  revalidatePath('/dashboard/shop/products/[id]');

  return returnProduct;
}

async function findMany() {
  const products = await db.product.findMany({
    include: {
      category: true,
      subCategory: true,
      supplier: true,
    },
  });

  const sorted = products.sort((a, b) => b.createdAt - a.createdAt);
  return sorted;
}

async function deleteOne(id) {
  await db.product.delete({
    where: { id },
  });

  return await findMany();
}

async function deleteMany(ids) {
  await db.product.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return await findMany();
}

async function getCategory() {
  return await db.productCategory.findMany({
    include: {
      type: true,
    },
  });
}

async function getSubCategory() {
  return await db.productSubCategory.findMany({
    include: {
      category: true,
    },
  });
}

async function getSupplier() {
  return await db.supplier.findMany();
}

async function getProductVariations() {
  return await db.productVariation.findMany();
}
async function getVariations() {
  return await db.variation.findMany({
    include: {
      variationOptions: true,
    },
  });
}

async function getProductAttributes(productVariationId) {
  return await db.productAttribute.findMany({
    where: {
      id: productVariationId,
    },
  });
}
export {
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
