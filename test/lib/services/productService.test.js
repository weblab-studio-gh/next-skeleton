import { create } from '@/utils/services/productService';

describe('create', () => {
  it('should create a new product', async () => {
    // Mock the necessary dependencies and data
    const db = {
      product: {
        create: jest.fn().mockResolvedValue({ id: 1 }),
        update: jest.fn().mockResolvedValue({ id: 1 }),
      },
      productImage: {
        create: jest.fn().mockResolvedValue({ id: 1 }),
      },
    };
    const data = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 9.99,
    };
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('imageFile', new File([''], 'test.jpg'));
    formData.append('galleryFile', new File([''], 'test1.jpg'));
    formData.append('galleryFile', new File([''], 'test2.jpg'));

    // Call the create function with the mock data
    const result = await create(formData, db);

    // Assert that the necessary functions were called with the correct data
    expect(db.product.create).toHaveBeenCalledWith({ data });
    expect(db.productImage.create).toHaveBeenCalledTimes(3);
    expect(db.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { ...data, imageId: 1, gallery: [{ id: 1 }, { id: 1 }, { id: 1 }] },
    });
    expect(result).toEqual({ id: 1 });
  });
});
