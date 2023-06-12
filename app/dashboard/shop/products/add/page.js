import { Suspense } from "react";

import AddProductForm from "./components/AddProductForm";
import NarrowPageContainer from "@/components/ui/containers/NarrowPageContainer";

import {
  create,
  getCategory,
  getSubCategory,
  getSupplier,
  update,
} from "@/lib/services/productService";

export default async function Page() {
  const categories = await getCategory();
  const subCategories = await getSubCategory();
  const suppliers = await getSupplier();

  const postData = async (data) => {
    "use server";
    create(data);
    console.log("data", data);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NarrowPageContainer>
        <AddProductForm
          categories={categories}
          subCategories={subCategories}
          suppliers={suppliers}
          handleCreate={create}
          update={update}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
