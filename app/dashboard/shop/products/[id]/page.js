import { Suspense } from "react";

import EditProductForm from "./components/EditProductForm";
import NarrowPageContainer from "@/components/ui/containters/NarrowPageContainer";

import {
  create,
  getCategory,
  getSubCategory,
  getSupplier,
  findOne,
  update,
} from "@/lib/services/productService";

export default async function Page({ searchParams, params }) {
  const item = await findOne(params.id);
  const categories = await getCategory();
  const subCategories = await getSubCategory();
  const suppliers = await getSupplier();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NarrowPageContainer>
        <EditProductForm
          categories={categories}
          subCategories={subCategories}
          suppliers={suppliers}
          handleUpdate={update}
          create={create}
          item={item}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
