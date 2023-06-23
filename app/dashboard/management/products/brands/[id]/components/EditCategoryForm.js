import TextInput from '@/components/ui/inputs/TextInput';
import ImageInput from '@/components/ui/inputs/ImageInput';
import MultipleImageInput from '@/components/ui/inputs/MultipleImageInput';
import SelectInput from '@/components/ui/inputs/SelectInput';
import TextArea from '@/components/ui/inputs/TextArea';
import ServerForm from '@/components/ui/forms/ServerForm';
import AddEditProductVariation from '@/components/partials/product/AddEditProductVariation';

export default function EditCategoryForm({
  handleUpdate,
  productTypes,
  subCategories,
  item,
  alternativeAction,
}) {
  const content = {
    title: 'Edit Category',
  };
  return (
    <ServerForm
      action={handleUpdate}
      content={content}
      alternativeAction={alternativeAction}
    >
      <div className="sm:col-span-6">
        <TextInput
          required={true}
          name="id"
          width="w-full "
          defaultValue={item?.id}
          hidden={true}
        />
        <TextInput
          defaultValue={item?.name}
          required={true}
          name="name"
          width="w-full "
          label={'Caregory Name'}
        />

        <TextArea
          label={'Category Description'}
          className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
          type="text"
          defaultValue={item?.description}
          name="description"
          rows="6"
        />
      </div>
      {/* <div className="sm:col-span-2">
        <ImageInput name="image" label="Product Image" />
      </div> */}

      <div className="sm:col-span-6">
        <div className="mt-1">
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6  ">
            <div className="sm:col-span-3">
              <SelectInput
                label="Remove Sub Category:"
                name="removeCategory"
                options={item?.subCategories}
                multiple
              />
              <SelectInput
                defaultValue={item?.type[0]?.name || ''}
                label="Product Type"
                name="type"
                data={item?.type}
                options={productTypes}
              />
            </div>
            <div className="sm:col-span-3">
              <SelectInput
                label="Add Sub Category:"
                name="subCategories"
                options={subCategories}
                multiple
              />
              <TextInput
                form="alternativeForm"
                name="sub"
                width="w-full "
                label={'Caregory Name'}
              />
              <button
                form="alternativeForm"
                type="submit"
                className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
              >
                Add Sub Category
              </button>
            </div>
            <div className="sm:col-span-3"></div>
          </div>
        </div>
        {/* <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p> */}
      </div>
    </ServerForm>
  );
}
