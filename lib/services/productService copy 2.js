"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import fs from "fs-extra";
import path from "path";
import checkIfFilePathIsOrCreate from "@/lib/utils/_helpers";
import { saveImageToServer } from "@/lib/utils/_helpers";
import { revalidatePath } from "next/cache";
import {
  formDataToJSON,
  processSupplier,
  processCreateSupplier,
  saveImage,
  disconnectCategory,
  disconnectSubCategory,
  connectCategories,
  disconnectGallery
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
  let createData = data,
    requestData,
    file,
    files,
    image;
    if (data instanceof FormData) {
      requestData = await formDataToJSON(data);
      file = data.get("imageFile");
      files = data.getAll("galleryFile");
      image = requestData.image;
      delete requestData.galleryFile;
      delete requestData.imageFile;
      delete requestData.image;
      delete requestData.removeGallery
      createData = requestData;
  }
  console.log("data", files);

  const { category, subCategory, gallery, ...otherData } = createData;

  
  processCreateSupplier(requestData, otherData);
  
  let product;
  console.log("gallery", otherData)

  if (file?.size > 0) {
    product = await db.product.create({
      data: otherData,
    });
    const filesArray = Array.isArray(files) ? files : [files];
    console.log("filesArray", filesArray.length, filesArray.length > 0);
    if (filesArray[0].size > 0) {
      const galleryImages = await Promise.all(
        filesArray.map(async (fs) => {
          console.log("LOOPING ================================", await saveImage(fs, product));
          return db.productImage.create({
            data: {
              name: fs.name,
              path: await saveImage(fs, product),
              productGallery: {
                connect: {
                  id: product.id,
                },
              },
            },
          });
        })
      );
      createData.gallery = galleryImages;
    }
    const newImage = await db.productImage.create({
      data: {
        name: file.name,
        path: await saveImage(file, product),
      },
    });
    otherData.imageId = newImage.id;
    // console.log("otherData", otherData.image);
    // otherData.image = await saveImage(file, product);
    product = await db.product.update({
      where: {
        id: product.id,
      },
      data: otherData,
    });
  } else {
    
    console.log("otherData", otherData);
    product = await db.product.create({
      data: otherData,
    });
    const filesArray = Array.isArray(files) ? files : [files];
    console.log("filesArray", filesArray.length, filesArray.length > 0);
    if (filesArray[0].size > 0) {
    const galleryImages = await Promise.all(
      filesArray.map(async (fs) => {
        console.log("LOOPING ================================", await saveImage(fs, product));
        return db.productImage.create({
          data: {
            name: fs.name,
            path: await saveImage(fs, product),
            productGallery: {
              connect: {
                id: product.id,
              },
            },
          },
        });
      })
    );
    otherData.gallery = galleryImages;
    db.product.update({
      where: {
        id: product.id,
      },
      data: otherData,
    });

  }
  }
  await connectCategories(category, subCategory, product.id, db);

  return product;
}
async function update(data) {
  let updateData = data,
    requestData,
    file,
    files,
    image;

  console.log("data", data);

  if (data instanceof FormData) {
    requestData = await formDataToJSON(data);
    file = data.get("imageFile");
    files = requestData.galleryFile
    image = requestData.image;
    delete requestData.imageFile;
    delete requestData.image;
    delete requestData.galleryFile;

    updateData = requestData;
  }

  const {
    category,
    subCategory,
    gallery,
    ...otherData
  } = updateData;

  processSupplier(requestData, otherData);
  if (file?.size > 0) {
    const newImage = await db.productImage.create({
      data: {
        name: file.name,
        path: await saveImage(file, updateData),
      },
    });
    otherData.imageId = newImage.id;
  }
  
  const filesArray = Array.isArray(files) ? files : [files];
  console.log("filesArray", filesArray.length, filesArray.length > 0);
  if (filesArray[0].size > 0) {
    const galleryImages = await Promise.all(
      filesArray.map(async (fs) => {
        console.log("LOOPING ================================", await saveImage(fs, updateData));
        return db.productImage.create({
          data: {
            name: fs.name,
            path: await saveImage(fs, updateData),
            productGallery: {
              connect: {
                id: updateData.id,
              },
            },
          },
        });
      })
    );
    updateData.gallery = galleryImages;
  }

  // Disconnect categories and subcategories
  if (otherData.removeCategory) {
    await disconnectCategory(otherData.removeCategory, updateData.id, db);
    delete otherData.removeCategory;
  }
  if (otherData.removeSubCategory) {
    await disconnectSubCategory(otherData.removeSubCategory, updateData.id, db);
    delete otherData.removeSubCategory;
  }
  if (otherData.removeGallery.length > 0) {
    console.log("otherData.removeGallery", otherData.removeGallery);
    await disconnectGallery(otherData.removeGallery, updateData.id, db);
  }
  delete otherData.removeGallery;

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
