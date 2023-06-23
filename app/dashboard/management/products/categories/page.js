import Table from '@/components/data_display/table/Table';
import { Suspense } from 'react';

import {
  findMany,
  columns,
  deleteOne,
  deleteMany,
} from '@/utils/services/product/productCategoryService';

export default async function Page() {
  const posts = await findMany();
  const cols = await columns();
  const content = {
    title: 'Categories',
    subtitle: 'Add new categories to your store',
    description: 'Manage your categories',
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Table
        content={content}
        data={posts}
        columns={cols}
        deleteData={deleteOne}
        bulkDeleteData={deleteMany}
      />
    </Suspense>
  );
}
