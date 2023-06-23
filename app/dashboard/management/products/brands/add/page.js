import { Suspense } from 'react';

import AddCategoryForm from './components/AddCategoryForm';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';

import {
  create,
  getType,
  getSubCategories,
  createSubCategory,
} from '@/utils/services/product/productCategoryService';

export default async function Page() {
  const subCategories = await getSubCategories();
  const types = await getType();

  const alternativeAction = async (data) => {
    'use server';
    const subCategory = await createSubCategory(data);
    return subCategory;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NarrowPageContainer>
        <AddCategoryForm
          productTypes={types}
          handleCreate={create}
          alternativeAction={alternativeAction}
          subCategories={subCategories}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
