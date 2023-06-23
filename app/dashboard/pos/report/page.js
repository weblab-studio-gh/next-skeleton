import Table from '@/components/data_display/table/Table';
import { Suspense } from 'react';

import {
  columns,
  getOrders,
  findMany,
  deleteMany,
  deleteOne,
} from '@/utils/services/order/productOrderService';

export default async function Page() {
  const orders = await getOrders();
  const cols = await columns();

  const content = {
    title: 'Orders',
    subtitle: 'Add new products to your store',
    description: 'Manage your products',
  };

  return (
    <div className="min-h-[100vh] bg-primary-light dark:bg-primary-dark">
      <Suspense fallback={<div>Loading...</div>}>
        <Table
          content={content}
          fun={findMany}
          data={orders}
          columns={cols}
          deleteData={deleteOne}
          bulkDeleteData={deleteMany}
        />
      </Suspense>
    </div>
  );
}
