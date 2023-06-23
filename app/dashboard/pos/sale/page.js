import { Suspense } from 'react';

import AddOrder from './components/AddOrder';
import NarrowPageContainer from '@/components/ui/containers/NarrowPageContainer';

import { findMany as getProducts } from '@/utils/services/product/productService';
import { findMany as getCategories } from '@/utils/services/product/productCategoryService';
import { create } from '@/utils/services/order/productOrderService';

export default async function Page() {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddOrder handleCreate={create} products={products} categories={categories} />
    </Suspense>
  );
}
