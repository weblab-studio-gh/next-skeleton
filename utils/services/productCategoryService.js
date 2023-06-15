'use server';
import { db } from '@/utils/db';
import { Prisma } from '@prisma/client';

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
    },
  });

  return productCategories.sort((a, b) => b.createdAt - a.createdAt);
}

async function deleteOne(id) {
  return await db.productCategory.delete({
    where: { id },
  });
}

async function deleteMany(ids) {
  return await db.productCategory.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

async function create(data) {
  return await prisma.productCategory.create({
    data: {
      ...data,
      type: {
        connect: {
          id: data.type[0].id,
        },
      },
    },
  });
}
async function getType() {
  return await prisma.productType.findMany();
}

export { columns, findMany, deleteOne, deleteMany, create, getType };
