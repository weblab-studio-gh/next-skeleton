import { Suspense } from 'react';

import AddProductForm from './components/AddProductForm';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';

import {
  create,
  getCategory,
  getSubCategory,
  getSupplier,
  update,
  getProductAttributes,
  getVariations,
  getProductVariations,
} from '@/utils/services/productService';

export default async function Page() {
  const categories = await getCategory();
  const subCategories = await getSubCategory();
  const suppliers = await getSupplier();
  const variations = await getVariations();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NarrowPageContainer>
        <AddProductForm
          categories={categories}
          subCategories={subCategories}
          suppliers={suppliers}
          handleCreate={create}
          variations={variations}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
