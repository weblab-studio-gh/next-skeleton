// use tailwind custom colors like text-primary-light and text-primary-dark for text bg border etc
"use client";

import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
const Modal = ({ children }) => {
  const router = useRouter();
  const modalRef = useRef();

  const backOnClickOutside = (event) => {
    if (modalRef.current === event.target) {
      router.back();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", backOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", backOnClickOutside);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`${"flex"} fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 items-center justify-center`}
    >
      <div className="bg-secondary-light dark:bg-primary-dark rounded-md p-6">
        {children}
      </div>
    </div>
  );
};

export default Modal;
