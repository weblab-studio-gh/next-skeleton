import TextInput from '@/components/ui/inputs/TextInput';
import ImageInput from '@/components/ui/inputs/ImageInput';
import MultipleImageInput from '@/components/ui/inputs/MultipleImageInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextArea from '@/components/ui/inputs/TextArea';
import ServerForm from '@/components/ui/forms/ServerForm';
import AddEditProductVariation2 from '@/components/partials/product/AddEditProductVariation2';

export default function EditProductForm({
  handleUpdate,
  categories,
  subCategories,
  suppliers,
  item: data,
  create,
  variations,
}) {
  const content = {
    title: 'Edit product',
    description: 'Edit your products',
  };
  if (data?.supplier && data?.supplier[0]?.name === undefined) {
    data.supplier = [{ name: 'None' }];
  }
  return (
    <ServerForm action={handleUpdate} content={content}>
      <div className="sm:col-span-4">
        <TextInput
          required={true}
          name="id"
          width="w-full "
          defaultValue={data?.id}
          hidden={true}
        />
        <TextInput
          required={true}
          name="name"
          width="w-full "
          label={'Product Name'}
          defaultValue={data?.name}
        />

        <TextArea
          label={'Product Description'}
          className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
          type="text"
          name="description"
          defaultValue={data?.description}
          rows="6"
        />
      </div>
      <div className="sm:col-span-2">
        <ImageInput
          src={data?.image?.path || data?.image}
          name="image"
          label="Product Gallery"
        />
      </div>
      <div className="sm:col-span-6">
        <MultipleImageInput
          src={data?.gallery}
          images={data?.gallery}
          name="gallery"
          label="Product Gallery"
        />
      </div>
      <div className="sm:col-span-6">
        <div className="mt-1">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-2">
              <TextInput
                label="Price"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                // required={true}
                type="number"
                name="storePrice"
                defaultValue={data?.price}
                width="w-full "
              />
            </div>

            <div className="sm:col-span-2">
              <TextInput
                label="Quantity"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                required={true}
                name="quantity"
                defaultValue={data?.quantity}
                width="w-full "
              />
            </div>

            <div className="sm:col-span-2">
              <TextInput
                label="Barcode"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="barcode"
                defaultValue={data?.barcode}
                width="w-full "
              />
            </div>
            <div className="sm:col-span-3">
              <SelectInput
                label="Add Category:"
                name="category"
                options={categories}
                multiple
              />
            </div>
            <div className="sm:col-span-3">
              <SelectInput
                label="Remove Category:"
                name="removeCategory"
                options={data?.category}
                multiple
              />
            </div>
            <div className="sm:col-span-3">
              <SelectInput
                label="Add Subcategory:"
                name="subCategory"
                options={subCategories}
                multiple
              />
            </div>
            <div className="sm:col-span-3">
              <SelectInput
                label="Remove Subcategory:"
                name="removeSubCategory"
                options={data?.subCategory}
                multiple
              />
            </div>

            <div className="sm:col-span-6">
              <SelectInput
                label="Supplier"
                name="supplier"
                options={suppliers}
                defaultValue={data?.supplier[0]?.name || ''}
                data={data?.supplier}
              />
            </div>
            <div className="sm:col-span-6">
              <AddEditProductVariation2
                fieldValues={data?.ProductVariation}
                variations={variations}
              />
            </div>
          </div>
        </div>
        {/* <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p> */}
      </div>
    </ServerForm>
  );
}
