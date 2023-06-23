'use server';
import { db } from '@/utils/db';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { processFormData, handleRelations } from '@/utils/_helpers';

export async function columns() {
  return Prisma.dmmf.datamodel.models
    .find((model) => model.name === 'Order')
    .fields.filter((field) => {
      if (field.documentation !== 'hidden') {
        return true;
      }
      return false;
    });
}

export async function getOrders() {
  return await db.order.findMany({
    include: {
      products: true,
      payment: true,
      costumer: true,
    },
  });
}

export async function findMany() {
  return await db.order.findMany({
    include: {
      products: true,
      payment: true,
      costumer: true,
    },
  });
}

export async function deleteMany(ids) {
  return await db.order.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
}

export async function deleteOne(id) {
  return await db.order.delete({
    where: {
      id,
    },
  });
}

export async function create(data) {
  const processedData = await processFormData(data);

  // revalidatePath('/admin/dashboard/shop/orders');

  return order;
}
