"use client";
export default function TableCell({ children }) {
  return (
    <td className="whitespace-nowrap px-3 py-4 text-sm text-primary-light dark:text-primary-dark">
      {children}
    </td>
  );
}
