// components/loaders/StudentSkeletonRow.tsx
import React from "react";

const SkeletonRow = () => (
  <tr className="animate-pulse text-sm text-[#535862]">
    <td className="py-4 px-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </td>
    <td className="py-4 px-6">
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </td>
    <td className="py-4 px-6">
      <div className="h-4 w-20 bg-gray-200 rounded" />
    </td>
    <td className="py-4 px-6">
      <div className="h-4 w-28 bg-gray-200 rounded" />
    </td>
    <td className="py-4 px-6">
      <div className="h-4 w-10 mx-auto bg-gray-200 rounded" />
    </td>
  </tr>
);

export default SkeletonRow;
