"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

import { revalidatePath } from "next/cache";
import {
  formDataToJSON,
  processSupplier,
  processCreateSupplier,
  saveImage,
  disconnectCategory,
  disconnectSubCategory,
  connectCategories,
} from "@/lib/utils/_helpers";

async function columns() {
  return Prisma.dmmf.datamodel.models
    .find((model) => model.name === "Product")
    .fields.filter((field) => {
      if (field.documentation !== "hidden") {
        return true;
      }
      return false;
    });
}

// get ony one product
async function findOne(id) {
  return await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      subCategory: true,
      supplier: true,
    },
  });
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
async function update(data) {
  let updateData = data,
    requestData,
    file,
    image;

  console.log("data", data);

  if (data instanceof FormData) {
    requestData = await formDataToJSON(data);
    file = data.get("imageFile");
    image = requestData.image;
    delete requestData.imageFile;
    delete requestData.image;
    updateData = requestData;
  }

  const {
    category,
    subCategory,

    ...otherData
  } = updateData;

  processSupplier(requestData, otherData);
  otherData.image = await saveImage(file, updateData);

  // Disconnect categories and subcategories
  if (otherData.removeCategory) {
    await disconnectCategory(otherData.removeCategory, updateData.id, db);
    delete otherData.removeCategory;
  }
  if (otherData.removeSubCategory) {
    await disconnectSubCategory(otherData.removeSubCategory, updateData.id, db);
    delete otherData.removeSubCategory;
  }

  revalidatePath("/dashboard/shop/products/[id]");

  let product;
  try {
    product = await db.product.update({
      where: {
        id: updateData.id,
      },
      data: otherData,
    });

    await connectCategories(category, subCategory, updateData.id, db);

    // Call sendNotification for successful product update
  } catch (error) {
    console.error("Product update failed:", error);

    // Call sendNotification for product update failure

    throw error; // Rethrow the error to handle it in the calling function
  }

  return product;
}
async function create(data) {
  let createData = data,
    requestData,
    file,
    image;
  console.log("data", data);
  if (data instanceof FormData) {
    requestData = await formDataToJSON(data);
    file = data.get("imageFile");
    image = requestData.image;
    delete requestData.imageFile;
    delete requestData.image;
    createData = requestData;
  }

  const { category, subCategory, ...otherData } = createData;

  processCreateSupplier(requestData, otherData);

  let product;

  if (file?.size > 0) {
    product = await db.product.create({
      data: otherData,
    });
    otherData.image = await saveImage(file, product);
    product = await db.product.update({
      where: {
        id: product.id,
      },
      data: otherData,
    });
  } else {
    product = await db.product.create({
      data: otherData,
    });
  }
  await connectCategories(category, subCategory, product.id, db);

  return product;
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
};
