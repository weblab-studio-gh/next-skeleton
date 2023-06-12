"use server";
import fs from "fs-extra";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";

const saveImageToServer = async (file, filePath, folderPath) => {
  const data = await file;
  if (data.size === 0) {
    throw new Error("No file was uploaded");
  }
  if (!filePath) {
    throw new Error("imagePath is required");
  }
  if (!folderPath) {
    throw new Error("imageName is required");
  }
  let imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (!imageTypes.includes(data.type)) {
    throw new Error("invalid image type");
  }
  const imageType = data.type.split("/")[1];
  const pathWithTypeName = filePath + "." + imageType;
  let buffer = await data.arrayBuffer();

  if (!fs.existsSync(path.join(process.cwd(), folderPath))) {
    fs.mkdirSync(path.join(process.cwd(), folderPath));
  }

  await fs.writeFile(
    path.join(process.cwd(), "public/", pathWithTypeName),
    Buffer.from(buffer)
  );
  return pathWithTypeName;
};
const sendNotification = async ({ type, message }) => {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(
      `http://localhost:3000/api/send-message?type=${type}&message=${message}&userID=${session.user.id}`
    );
    const data = await response.json();
    console.log("data", data);
  } catch (err) {
    console.log("err", err);
  }
};
const attachCurrentToObjAndChildren = (array) => {
  let arr = [];
  array.forEach((item) => {
    let obj = item;
    obj.current = function (pathName) {
      if (obj.href === pathName) return true;
    };

    arr.push(obj);
  });
  return arr;
};
export async function formDataToJSON(formData) {
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
export async function processSupplier(requestData, otherData) {
  if (requestData?.supplier) {
    otherData.supplier = {
      set: {
        id: requestData.supplier,
      },
    };
  } else {
    String(requestData?.supplier) === "" && delete otherData.supplier;
  }
}
export async function processCreateSupplier(requestData, otherData) {
  if (String(requestData?.supplier) !== "") {
    otherData.supplier = {
      connect: {
        id: requestData.supplier,
      },
    };
  } else {
    String(requestData?.supplier) === "" && delete otherData.supplier;
  }
}
export async function saveImage(file, updateData) {
  if (file?.size > 0) {
    const folderName = updateData.id;
    const fileName =
      updateData.name.replace(/\s+/g, "-").toLowerCase() + "_" + Date.now() + file.name;

    let filePath = `/images/products/${folderName}/${fileName}`;
    let folderPath = `/public/images/products/${folderName}/`;

    const savePath = await saveImageToServer(file, filePath, folderPath);

    return `http://localhost:3000/${savePath}`;
  }

  return null;
}
export async function connectCategories(category, subCategory, id, db) {
  if (Array.isArray(category)) {
    for (const cat of category) {
      await db.product.update({
        where: { id },
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
      where: { id },
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
        where: { id },
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
      where: { id },
      data: {
        subCategory: {
          connect: {
            id: subCategory,
          },
        },
      },
    });
  }
}
export async function disconnectCategory(categoryId, productId, db) {
  if (Array.isArray(categoryId)) {
    for (const cat of categoryId) {
      await db.product.update({
        where: { id: productId },
        data: {
          category: {
            disconnect: {
              id: cat,
            },
          },
        },
      });
    }
  } else if (categoryId) {
    await db.product.update({
      where: { id: productId },
      data: {
        category: {
          disconnect: {
            id: categoryId,
          },
        },
      },
    });
  }
}
export async function disconnectSubCategory(subCategoryId, productId, db) {
  if (Array.isArray(subCategoryId)) {
    for (const cat of subCategoryId) {
      await db.product.update({
        where: { id: productId },
        data: {
          subCategory: {
            disconnect: {
              id: cat,
            },
          },
        },
      });
    }
  } else if (subCategoryId) {
    await db.product.update({
      where: { id: productId },
      data: {
        subCategory: {
          disconnect: {
            id: subCategoryId,
          },
        },
      },
    });
  }
}
export { saveImageToServer, sendNotification, attachCurrentToObjAndChildren };


export async function disconnectGallery(removeGallery, productId, db) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { gallery: true },
  });
  const galleryIds = product.gallery.map((image) => image.id);
  const removeIds = Array.isArray(removeGallery)
    ? removeGallery.map((image) => image.id || image)
    : removeGallery.split(",");
  const filteredIds = removeIds.filter((id) => galleryIds.includes(id));
  console.log("removeIds", removeIds);
  console.log("removeIds.length", removeIds.length);
  if (filteredIds.length > 1) {
    console.log("DELETE MANY");
    await db.productImage.deleteMany({ where: { id: { in: filteredIds } } });
  } else if (filteredIds.length === 1) {
    console.log("DELETE ONE");
    await db.productImage.delete({ where: { id: filteredIds[0] } });
  }
}

export async function saveGallery(filesArray, product) {
  if (filesArray[0].size > 0) {
    const galleryImages = await Promise.all(
      filesArray.map(async (fs) => {
        console.log(
          "LOOPING ================================",
          await saveImage(fs, product)
        );
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
    return galleryImages;
  }
}

export async function processProductImage(file, product) {
  if (file?.size > 0) {
    // Save the product image
    await db.productImage.create({
      data: {
        name: file.name,
        path: await saveImage(file, product),
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });
  }
}

export async function processFormData(data) {
  let createData = data;
  if (data instanceof FormData) {
    const requestData = await formDataToJSON(data);
    const file = data.get("imageFile");
    const files = data.getAll("galleryFile");
    const image = requestData.image;
    const removeGallery = requestData.removeGallery;
    delete requestData.galleryFile;
    delete requestData.imageFile;
    delete requestData.image;
    delete requestData.removeGallery;
    createData = requestData;
    return { createData, file, files, image, requestData, removeGallery };
  } else {
    return createData;
  }
}