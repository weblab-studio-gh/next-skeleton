import { Suspense } from "react";

import AddCategoryForm from "./components/AddCategoryForm";
import NarrowPageContainer from "@/components/ui/containers/NarrowPageContainer";

import { create, getType } from "@/lib/services/productService";

export default async function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NarrowPageContainer>
        <AddCategoryForm productTypes={getType} handleCreate={create} />
      </NarrowPageContainer>
    </Suspense>
  );
}
