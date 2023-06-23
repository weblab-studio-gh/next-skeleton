import { Suspense } from 'react';

import EditProductForm from './components/EditProductForm';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';

import {
  create,
  getCategory,
  getSubCategory,
  getSupplier,
  findOne,
  getVariations,
  update,
} from '@/utils/services/product/productService';

export default async function Page({ searchParams, params }) {
  const item = await findOne(params.id);
  const categories = await getCategory();
  const subCategories = await getSubCategory();
  const suppliers = await getSupplier();
  const variations = await getVariations();
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
          variations={variations}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
