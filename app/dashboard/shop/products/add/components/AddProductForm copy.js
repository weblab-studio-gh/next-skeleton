import Image from "next/image";

import TextInput from "@/components/ui/inputs/TextInput";
import ImageInput from "@/components/ui/inputs/ImageInput";

export default function AddProductForm({
  handleCreate,
  categories,
  subCategories,
  suppliers,
  item: data,
}) {
  return (
    <form action={handleCreate} className="space-y-8 divide-y ">
      <div className="space-y-8 divide-y py-8">
        <div>
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium leading-6 text-secondary-light dark:text-secondary-dark">
                Edit product
              </h3>
              <p className="mt-1 text-sm text-primary-light dark:text-primary-dark">
                Edit your products
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <TextInput
                required={true}
                name="name"
                width="w-full "
                label={"Product Name"}
                defaultValue={data?.name}
              />
              {/* <input
                className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="name"
              /> */}
              <label
                className="block text-sm font-medium text-primary-light dark:text-primary-dark"
                htmlFor={"description"}
              >
                Product Description
              </label>
              <textarea
                label={"Product Description"}
                className="bg-primary-light w-full dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                type="text"
                name="description"
                defaultValue={data?.description}
                rows="6"
              />
            </div>
            <div className="sm:col-span-2">
              <ImageInput
                src={data?.image?.url || data?.image}
                name="image"
                label="Product Gallery"
              />
            </div>

            <div className="sm:col-span-6">
              <div className="mt-1">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-2">
                    <label>Price: </label>
                    <input
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      required
                      type="text"
                      name="price"
                      defaultValue={data?.price}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label>Quantity: </label>
                    <input
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      type="text"
                      required
                      name="quantity"
                      defaultValue={data?.quantity}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label>Barcode: </label>
                    <input
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      type="text"
                      name="barcode"
                      defaultValue={data?.barcode}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label>Category: </label>

                    <select
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      type="text"
                      name="category"
                      options={categories}
                      defaultValue={data?.category}
                      multiple
                    >
                      {categories && categories.length > 0
                        ? categories.map((cat) => (
                            <option
                              value={cat.id}
                              key={cat.id}
                              defaultValue={cat.id}
                            >
                              {cat.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label>Subcategory: </label>
                    <select
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      type="text"
                      name="subCategory"
                      options={subCategories}
                      defaultValue={data?.subCategories}
                      multiple
                    >
                      {subCategories && subCategories.length > 0
                        ? subCategories.map((cat) => (
                            <option
                              value={cat.id}
                              key={cat.id}
                              defaultValue={cat.id}
                            >
                              {cat.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label>Supplier: </label>
                    <select
                      className="bg-primary-light w-full  invalid:animate-pulse dark:invalid:border-error-dark invalid:border-error-light  dark:bg-primary-dark rounded-md border-primary-light dark:border-primary-dark px-3 py-2 text-primary-light dark:text-primary-dark focus:outline-none focus:ring-primary-light dark:focus:ring-primary-dark focus:border-primary-light dark:focus:border-primary-dark "
                      type="text"
                      name="supplier"
                      options={suppliers}
                    >
                      <option value="">Select</option>

                      {suppliers && suppliers.length > 0
                        ? suppliers.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))
                        : null}
                    </select>
                  </div>
                </div>
              </div>
              {/* <p className="mt-2 text-sm text-gray-500">
                Write a few sentences about yourself.
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-color-light dark:bg-color-dark py-2 px-4 text-sm font-medium text-primary-light dark:text-primary-dark shadow-sm hover:bg-secondary-light dark:hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
