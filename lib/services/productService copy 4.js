"use server";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

import { saveImageToServer, sendNotification } from "@/lib/utils/_helpers";
import { revalidatePath } from "next/cache";

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

async function update(data) {
  let updateData = data,
    requestData,
    file,
    image;
  if (data instanceof FormData) {
    async function formDataToJSON(formData) {
      const obj = {};
      for (const key of formData.keys()) {
        if (key.match(/\$ACTION_ID_*/)) {
          continue;
        }

        const value = formData.getAll(key); // Using getAll instead of get
        obj[key] = value.length > 1 ? value : value[0];
      }
      return obj;
    }
    requestData = await formDataToJSON(data);

    // save imageFile to variable and delete it from requestData
    file = data.get("imageFile");
    image = requestData.image;
    delete requestData.imageFile;
    delete requestData.image;
    updateData = requestData;
    // image variable is the base64 string write the string to a text file
  }
  const {
    category,
    subCategory,

    ...otherData
  } = updateData;

  // Check if supplier exists and add it to data object
  if (requestData?.supplier) {
    otherData.supplier = {
      set: {
        id: requestData.supplier,
      },
    };
  } else {
    String(requestData?.supplier) === "" && delete otherData.supplier;
  }

  if (file?.size > 0) {
    const folderName = updateData.id;
    const fileName =
      updateData.name.replace(/\s+/g, "-").toLowerCase() + "_" + Date.now();

    let filePath = `/images/products/${folderName}/${fileName}`;
    let folderPath = `/public/images/products/${folderName}/`;

    const savePath = await saveImageToServer(file, filePath, folderPath);

    otherData.image = `http://localhost:3000/${savePath}`;
  }
  console.log("DATA ------------------------------", updateData);
  if (otherData.removeCategory) {
    // check if otherData.removeCategory is an array
    if (Array.isArray(otherData.removeCategory)) {
      for (const cat of otherData.removeCategory) {
        await db.product.update({
          where: { id: updateData.id },
          data: {
            category: {
              disconnect: {
                id: cat,
              },
            },
          },
        });
      }
      delete otherData.removeCategory;
    } else {
      await db.product.update({
        where: { id: updateData.id },
        data: {
          category: {
            disconnect: {
              id: otherData.removeCategory,
            },
          },
        },
      });
      delete otherData.removeCategory;
    }
  }
  if (otherData.removeSubCategory) {
    // check if otherData.removeSubCategory is an array
    if (Array.isArray(otherData.removeSubCategory)) {
      for (const cat of otherData.removeSubCategory) {
        await db.product.update({
          where: { id: updateData.id },
          data: {
            subCategory: {
              disconnect: {
                id: cat,
              },
            },
          },
        });
      }
      delete otherData.removeSubCategory;
    } else {
      await db.product.update({
        where: { id: updateData.id },
        data: {
          subCategory: {
            disconnect: {
              id: otherData.removeSubCategory,
            },
          },
        },
      });
      delete otherData.removeSubCategory;
    }
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

    // Connect categories to product
    if (Array.isArray(category)) {
      for (const cat of category) {
        await db.product.update({
          where: { id: updateData.id },
          data: {
            category: {
              connect: {
                id: cat,
              },
            },
          },
        });
      }
    } else if (category) {
      await db.product.update({
        where: { id: updateData.id },
        data: {
          category: {
            connect: {
              id: category,
            },
          },
        },
      });
    }
    console.log("subCategory", subCategory);
    if (Array.isArray(subCategory)) {
      for (const cat of subCategory) {
        console.log("cat", cat);
        await db.product.update({
          where: { id: updateData.id },
          data: {
            subCategory: {
              connect: {
                id: cat,
              },
            },
          },
        });
      }
    } else if (subCategory) {
      await db.product.update({
        where: { id: updateData.id },
        data: {
          subCategory: {
            connect: {
              id: subCategory,
            },
          },
        },
      });
    }

    // Call sendNotification for successful product update
    // sendNotification({
    //   type: "success",
    //   title: "Success",
    //   message: "Product updated!",
    // });
  } catch (error) {
    console.error("Product update failed:", error);

    // Call sendNotification for product update failure
    // sendNotification({
    //   type: "error",
    //   title: "Error",
    //   message: "Product update failed.",
    // });

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

async function create(data) {
  let createData = data,
    requestData,
    file,
    image;
  console.log("data", data);

  if (data instanceof FormData) {
    async function formDataToJSON(formData) {
      const obj = {};
      for (const key of formData.keys()) {
        if (key.match(/\$ACTION_ID_*/)) {
          continue;
        }

        const value = formData.getAll(key); // Using getAll instead of get
        obj[key] = value.length > 1 ? value : value[0];
      }
      return obj;
    }

    requestData = await formDataToJSON(data);
    console.log("requestData", data.entries());
    // save imageFile to variable and delete it from requestData
    file = data.get("imageFile");
    image = requestData.image;
    delete requestData.imageFile;
    delete requestData.image;
    createData = requestData;
  }

  console.log("das", requestData);

  const { category, subCategory, ...otherData } = createData;

  // Check if supplier exists and add it to data object
  if (String(requestData?.supplier) !== "") {
    otherData.supplier = {
      connect: {
        id: requestData.supplier,
      },
    };
  } else {
    String(requestData?.supplier) === "" && delete otherData.supplier;
  }

  let product;

  if (file?.size > 0) {
    product = await db.product.create({
      data: otherData,
    });
    const folderName = product.id;
    const fileName =
      otherData.name.replace(/\s+/g, "-").toLowerCase() + "_" + Date.now();

    let filePath = `/images/products/${folderName}/${fileName}`;
    let folderPath = `/public/images/products/${folderName}/`;

    const savePath = await saveImageToServer(file, filePath, folderPath);

    await update({
      id: product.id,
      image: `http://localhost:3000/${savePath}`,
    });
  } else {
    console.log("createData", otherData);
    product = await db.product.create({
      data: otherData,
    });
  }

  // Connect categories to product
  if (Array.isArray(category)) {
    for (const cat of category) {
      await db.product.update({
        where: { id: product.id },
        data: {
          category: {
            connect: {
              id: cat,
            },
          },
        },
      });
    }
  } else if (category) {
    await db.product.update({
      where: { id: product.id },
      data: {
        category: {
          connect: {
            id: category,
          },
        },
      },
    });
  }

  if (Array.isArray(subCategory)) {
    for (const cat of subCategory) {
      await db.product.update({
        where: { id: product.id },
        data: {
          subCategory: {
            connect: {
              id: cat,
            },
          },
        },
      });
    }
  } else if (subCategory) {
    await db.product.update({
      where: { id: product.id },
      data: {
        subCategory: {
          connect: {
            id: subCategory,
          },
        },
      },
    });
  }

  return product;
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
