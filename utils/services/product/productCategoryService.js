'use server';
import { db } from '@/utils/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { processFormData, handleRelations } from '@/utils/_helpers';

async function columns() {
  return Prisma.dmmf.datamodel.models
    .find((model) => model.name === 'ProductCategory')
    .fields.filter((field) => {
      if (field.documentation !== 'hidden') {
        return true;
      }
      return false;
    });
}
async function findMany() {
  const productCategories = await db.productCategory.findMany({
    include: {
      type: true,
      subCategories: true,
      _count: {
        select: { product: true },
      },
      product: {
        include: {
          image: true,
        },
      },
    },
  });
  await db.$disconnect();

  return productCategories.sort((a, b) => b.createdAt - a.createdAt);
}

async function deleteOne(id) {
  await db.productCategory.delete({
    where: { id },
  });
  return findMany();
}

async function deleteMany(ids) {
  await db.productCategory.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  await db.$disconnect();
  return findMany();
}

export async function createSubCategory(data) {
  const da = await db.productSubCategory
    .create({
      data: { name: data.get('sub') },
    })
    .then(() => revalidatePath('/dashboard/shop/categories/add'));
  await db.$disconnect();
  return da;
}

// get subcategories
export async function getSubCategories() {
  const data = await db.productSubCategory.findMany({});
  await db.$disconnect();
  return data;
}

async function create(data) {
  const { createData } = await processFormData(data);
  const { type, subCategory, ...otherData } = createData;

  const inputData = subCategory?.map((item) => {
    return { id: item };
  });
  const category = await db.productCategory.create({
    data: {
      type: {
        connect: {
          id: type,
        },
      },

      ...otherData,
    },
  });

  inputData &&
    (await handleRelations('productCategory', 'subCategories', category, inputData));
  revalidatePath('/dashboard/shop/categories/add');
  await db.$disconnect();
  return category;
}
export async function findOne(id) {
  const data = await db.productCategory.findUnique({
    where: { id },
    include: {
      type: true,
      subCategories: true,
    },
  });
  await db.$disconnect();
  return data;
}

export async function update(data, id) {
  const { createData } = await processFormData(data);
  const { type, subCategories, removeCategory, ...otherData } = createData;

  subCategories &&
    (await handleRelations(
      'productCategory',
      'subCategories',
      createData,
      subCategories
    ));
  removeCategory &&
    (await handleRelations(
      'productCategory',
      'subCategories',
      createData,
      removeCategory,
      'disconnect'
    ));
  type && (await handleRelations('productCategory', 'type', createData, type, 'set'));
  await db.$disconnect();
  revalidatePath('/dashboard/shop/categories/add');
}
async function getType() {
  const data = await db.productType.findMany();
  await db.$disconnect();
  return data;
}

export { columns, findMany, deleteOne, deleteMany, create, getType };
