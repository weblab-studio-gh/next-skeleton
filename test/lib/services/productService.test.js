import productService from '@lib/services/productService';
test('updates product data', async () => {
  const data = {
    id: 1,
    name: 'Product 1',
    price: 10,
    category: 'Category 1',
    subCategory: 'Subcategory 1',
  };
  const updatedData = {
    name: 'Product 1 Updated',
    price: 20,
    category: 'Category 2',
    subCategory: 'Subcategory 2',
  };
  const expectedProduct = {
    id: 1,
    name: 'Product 1 Updated',
    price: 20,
    category: 'Category 2',
    subCategory: 'Subcategory 2',
  };
  const db = {
    product: {
      update: jest.fn().mockResolvedValue(expectedProduct),
    },
  };
  const product = await productService.update(updatedData, db);
  expect(product).toEqual(expectedProduct);
  expect(db.product.update).toHaveBeenCalledWith({
    where: {
      id: data.id,
    },
    data: updatedData,
  });
});