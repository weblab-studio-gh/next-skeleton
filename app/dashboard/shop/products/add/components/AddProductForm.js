import TextInput from '@/components/ui/inputs/TextInput';
import ImageInput from '@/components/ui/inputs/ImageInput';
import MultipleImageInput from '@/components/ui/inputs/MultipleImageInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextArea from '@/components/ui/inputs/TextArea';
import ServerForm from '@/components/ui/forms/ServerForm';
import AddEditProductVariation from '@/components/partials/product/AddEditProductVariation';

export default function AddProductForm({
  handleCreate,
  categories,
  subCategories,
  suppliers,
  attributes,
  variations,
}) {
  const content = {
    title: 'Add product',
    description: 'Add your products',
  };

  return (
    <ServerForm action={handleCreate} content={content}>
      <div className="sm:col-span-4">
        <TextInput required={true} name="name" width="w-full " label={'Product Name'} />

        <TextArea
          label={'Product Description'}
          className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
          type="text"
          name="description"
          rows="6"
        />
      </div>
      <div className="sm:col-span-2">
        <ImageInput name="image" label="Product Image" />
      </div>
      <div className="sm:col-span-6">
        <MultipleImageInput name="gallery" label="Gallery" />
      </div>
      <div className="sm:col-span-6">
        <div className="mt-1">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6  ">
            <div className="sm:col-span-2">
              <TextInput
                label="Price"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="price"
                width="w-full "
              />
            </div>

            <div className="sm:col-span-2">
              <TextInput
                label="Quantity"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="quantity"
                width="w-full "
              />
            </div>

            <div className="sm:col-span-2">
              <TextInput
                label="Barcode"
                className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="barcode"
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
                label="Add Subcategory:"
                name="subCategory"
                options={subCategories}
                multiple
              />
            </div>

            <div className="sm:col-span-6">
              <SelectInput label="Supplier" name="supplier" options={suppliers} />
            </div>
            <div className="sm:col-span-6">
              <AddEditProductVariation variations={variations} attributes={attributes} />
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
