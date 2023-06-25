'use client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { convertToBase64 } from '@/utils/utils';
export default function ImageInput({ label, multiple = false, name, src }) {
  const changeImageOnInputRef = useRef(null);
  const [image, setImage] = useState(src);
  const [imageFile, setImageFile] = useState();

  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-primary-light dark:text-primary-dark"
      >
        {label}
      </label>

      <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-primary-light dark:border-primary-dark px-3 pt-2 pb-3">
        <div className="space-y-1 text-center">
          <div className="flex text-sm text-primary-light dark:text-primary-dark">
            <label
              htmlFor="file-upload"
              className=" relative cursor-pointer rounded-md  bg-primary-light dark:bg-primary-dark font-medium text-secondary-light dark:text-secondary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light dark:focus-within:ring-primary-dark focus-within:ring-offset-2 hover:text-color-light dark:hover:text-color-dark"
            >
              <Image
                ref={changeImageOnInputRef}
                src={image || 'https://avatars.githubusercontent.com/u/82118527'}
                alt={label}
                width={300}
                height={200}
                style={{ width: 300, height: 200, objectFit: 'cover' }}
                // cover photo
                name="imageFile"
                className="rounded-t-md object-cover  "
              />
              <span className="flex text-primary-light dark:text-primary-dark justify-center align-middle py-2 bg-neutral-light dark:bg-neutral-dark rounded-b-md">
                Upload <p className="px-2">or drag and drop</p>
              </span>
              <input
                id="file-upload"
                type="file"
                className="sr-only"
                name="imageFile"
                multiple={multiple}
                onChange={async (e) => {
                  try {
                    setImage(URL.createObjectURL(e.target.files[0]));
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
              <input type="hidden" name={name} value={imageFile || src} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
