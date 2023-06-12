"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import {
  processSupplier,
  processCreateSupplier,
  disconnectCategory,
  disconnectSubCategory,
  connectCategories,
  disconnectGallery,
  processFormData,
  processProductImage,
  saveGallery,
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
  let { createData, file, files, image, requestData } = await processFormData( // If data is not FormData, object will be passed
    data
  );
  const { category, subCategory, gallery, ...otherData } = createData;

  processCreateSupplier(requestData, otherData); // Save and connect supplier

  let product = await db.product.create({ // need the product for the ID
    data: otherData,
  });

  const filesArray = Array.isArray(files) ? files : [files]; // File is not always an array
  
  await saveGallery(filesArray, product); // Save gallery relations 
  await processProductImage(file, product); // Save product image
  await connectCategories(category, subCategory, product.id, db); // Save category relations

  return product;
}

async function update(data) {
  let {
    createData: updateData,
    file,
    files,
    requestData,
    removeGallery,
  } = await processFormData(data);
  const { category, subCategory, gallery, ...otherData } = updateData;

  processSupplier(requestData, otherData); // Save supplier

  // Saving images to gallery
  const filesArray = Array.isArray(files) ? files : [files];
  await saveGallery(filesArray, updateData);
  // Disconnect Relations
  if (otherData.removeCategory) {
    await disconnectCategory(otherData.removeCategory, updateData.id, db);
  }
  delete otherData.removeCategory;
  if (otherData.removeSubCategory) {
    await disconnectSubCategory(otherData.removeSubCategory, updateData.id, db);
  }
  delete otherData.removeSubCategory;
  console.log("otherData.removeGallery", otherData);
  if (removeGallery?.length > 0) {
    console.log("otherData.removeGallery", otherData.removeGallery);
    await disconnectGallery(removeGallery, updateData.id, db);
  }
  delete otherData.removeGallery;
  revalidatePath("/dashboard/shop/products/[id]");
  let product
  try {
     product = await db.product.update({
      where: {
        id: updateData.id,
      },
      data: otherData,
    });
    await processProductImage(file, product);
    await connectCategories(category, subCategory, updateData.id, db);
  } catch (error) {
    console.error("Product update failed:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
  return product;
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
