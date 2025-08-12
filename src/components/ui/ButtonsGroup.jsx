import React from "react";
import { Trash2, Pencil, EyeIcon } from "lucide-react";

function ButtonsGroup({ data, onEdit, onDelete, onView }) {
  return (
    <div className="flex space-x-1">
      <button
        onClick={() => onView(data)}
        aria-label="Edit"
        className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
      >
        <EyeIcon size={16} />
      </button>
      <button
        onClick={() => onEdit(data)}
        aria-label="Edit"
        className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
      >
        <Pencil size={16} />
      </button>

      <button
        onClick={() => data._id && onDelete(data._id)}
        aria-label="Delete"
        className="inline-flex items-center justify-center w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-300 transition"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

export default ButtonsGroup;
