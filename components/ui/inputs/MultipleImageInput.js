"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { convertToBase64 } from "@/lib/utils/utils";

export default function MultipleImageInput({
  label,
  multiple = true,
  name,
  path,
  images = [],
}) {
  const changeImageOnInputRef = useRef(null);
  const [gallery, setGallery] = useState(images);
  const [removeGallery, setRemoveGallery] = useState();

  const handleImageChange = async (e) => {
    if (gallery.length >= 6) {
      return;
    }
    const newImages = Array.from(e.target.files);
    const newGallery = await Promise.all(
      newImages.map(async (file) => {
        const src = URL.createObjectURL(file);
        return { path, src, file };
      })
    );
    setGallery((prevGallery) => [...prevGallery, ...newGallery]);
  };
  useEffect(() => {
    console.log(gallery);
  }, [gallery]);
  useEffect(() => {
    console.log(removeGallery);
  }, [removeGallery]);
  const handleImageDelete = (index) => {
    setGallery((prevGallery) => {
      const newGallery = [...prevGallery];
      newGallery.splice(index, 1);
      return newGallery;
    });
    // add the ID's of the images to be deleted to the removeGallery state
    setRemoveGallery((prevRemoveGallery) => [
      ...(prevRemoveGallery || []),
      gallery[index].id,
    ]);

  };

  return (
    <div className="sm:col-span-6">
      <label
        htmlFor="cover-photo"
        className="block text-sm font-medium text-primary-light dark:text-primary-dark"
      >
        {label}
      </label>

      <div className="mt-1 flex justify-between rounded-md border-2 border-dashed border-primary-light dark:border-primary-dark px-3 pt-2 pb-3 h-80 overflow-auto">
        <label
          htmlFor="multiple-file-upload"
          className="relative cursor-pointer rounded-md bg-primary-light dark:bg-primary-dark font-medium text-secondary-light dark:text-secondary-dark focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-light dark:focus-within:ring-primary-dark focus-within:ring-offset-2 hover:text-color-light dark:hover:text-color-dark"
          style={{ width: "calc(33.33% - 4px)", height: 200 }}
        >
          <Image
            ref={changeImageOnInputRef}
            src={
              gallery.length > 0
                ? gallery[gallery.length - 1].path ||
                  gallery[gallery.length - 1].src
                : "https://avatars.githubusercontent.com/u/82118527"
            }
            alt={label}
            width={300}
            height={200}
            style={{ width: 300, height: 200, objectFit: "cover" }}
            // cover photo
            name="galleryImg"
            className="rounded-t-md object-cover"
          />
          <span className="flex text-primary-light dark:text-primary-dark justify-center align-middle py-2 bg-neutral-light dark:bg-neutral-dark rounded-b-md">
            Upload <p className="px-2">or drag and drop</p>
          </span>
          <input
            id="multiple-file-upload"
            type="file"
            className="sr-only"
            name="galleryFile"
            multiple={true}
            onChange={handleImageChange}
          />
          <input type="hidden" name="removeGallery" value={removeGallery} />
        </label>
        <div className="flex flex-wrap">
          {gallery.map((image, index) => (
            <div key={index} className="relative m-2">
              <Image
                key={index}
                src={image.path || image.src}
                alt={label}
                width={100}
                height={100}
                style={{ width: 100, height: 100, objectFit: "cover" }}
                className="rounded-md object-cover"
              />
              <button
                type="button"
                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                onClick={() => handleImageDelete(index)}
                style={{ transform: "translate(50%, -50%)" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L10 8.586l-2.293-2.293a1 1 0 00-1.414 1.414L8.586 10l-2.293 2.293a1 1 0 001.414 1.414L10 11.414l2.293 2.293a1 1 0 001.414-1.414L11.414 10l2.293-2.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
