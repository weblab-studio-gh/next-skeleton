import Table from "@/components/data_display/table/Table";
import { Suspense } from "react";

import {
  columns,
  findMany,
  deleteOne,
  deleteMany,
} from "@/lib/services/productService";

export default async function Page() {
  const products = await findMany();
  const cols = await columns();

  const content = {
    title: "Products",
    subtitle: "Add new products to your store",
    description: "Manage your products",
  };

  return (
    <div className="min-h-[100vh] bg-primary-light dark:bg-primary-dark">
      <Suspense fallback={<div>Loading...</div>}>
        <Table
          content={content}
          fun={findMany}
          data={products}
          columns={cols}
          deleteData={deleteOne}
          bulkDeleteData={deleteMany}
        />
      </Suspense>
    </div>
  );
}
