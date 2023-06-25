"use client";
import { useState } from "react";
import ImageInput from "./ImageInput";
import Image from "next/image";

export default function ImageInputDisplay({
  name,
  value,
  onChange,
  label,
  src,
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {value ? (
        <div className="relative">
          <Image
            src={src}
            alt={label}
            layout="responsive"
            width={500} // Or whatever your desired dimensions are
            height={300}
          />
          {hovering && (
            <div className="absolute top-0 left-0 p-4 w-full h-full flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out">
              <ImageInput name={name} value={value} onChange={onChange} />
            </div>
          )}
        </div>
      ) : (
        <ImageInput value={value} name={name} onChange={onChange} />
      )}
    </div>
  );
}
