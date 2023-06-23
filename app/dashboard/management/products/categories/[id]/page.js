import { Suspense } from 'react';

import EditCategoryForm from './components/EditCategoryForm';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';

import {
  update,
  getType,
  getSubCategories,
  findOne,
  createSubCategory,
} from '@/utils/services/product/productCategoryService';

export default async function Page({ params }) {
  const item = await findOne(params.id);
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
        <EditCategoryForm
          productTypes={types}
          subCategories={subCategories}
          handleUpdate={update}
          item={item}
          alternativeAction={alternativeAction}
        />
      </NarrowPageContainer>
    </Suspense>
  );
}
