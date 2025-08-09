// "use client";

// import { useRef, useState } from "react";

// export default function FileUpload({
//   label = "Upload file",
//   onChange,
//   accept = "image/*",
//   multiple = false,
//   preview = true,
// }) {
//   const inputRef = useRef(null);
//   const [files, setFiles] = useState([]);

//   const handleFiles = (selectedFiles) => {
//     const fileList = Array.from(selectedFiles);
//     setFiles(fileList);
//     onChange?.(multiple ? fileList : fileList[0]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const droppedFiles = e.dataTransfer.files;
//     if (droppedFiles.length > 0) {
//       handleFiles(droppedFiles);
//     }
//   };

//   const openFileDialog = () => {
//     inputRef.current?.click();
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-700">{label}</label>

//       <div
//         className="w-full border-2 border-dashed border-gray-300 p-6 text-center rounded-xl cursor-pointer hover:border-gray-500 transition"
//         onClick={openFileDialog}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={handleDrop}
//       >
//         <p className="text-sm text-gray-500">Drag & drop files here or click to browse</p>
//         <input
//           ref={inputRef}
//           type="file"
//           accept={accept}
//           multiple={multiple}
//           hidden
//           onChange={(e) => handleFiles(e.target.files)}
//         />
//       </div>

//       {preview && files.length > 0 && (
//         <div className="mt-3 grid grid-cols-3 gap-4">
//           {files.map((file, i) => (
//             <div key={i} className="aspect-square border rounded overflow-hidden">
//               <img
//                 src={URL.createObjectURL(file)}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useRef, useState } from "react";

export default function FileUpload({
  label = "Upload file",
  onChange,
  accept = "image/*",
  multiple = false,
  preview = true,
  disabled = false,
  maxFiles = 1,
}) {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleFiles = async (selectedFiles) => {
    const fileList = Array.from(selectedFiles).slice(0, maxFiles);

    setFiles(fileList);

    const base64List = await Promise.all(fileList.map(convertToBase64));

    if (maxFiles === 1) {
      onChange?.(base64List[0]);
    } else {
      onChange?.(base64List);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div
        className="w-full border-2 border-dashed border-gray-300 p-6 text-center rounded-xl cursor-pointer hover:border-gray-500 transition"
        onClick={openFileDialog}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-sm text-gray-500">
          Drag & drop {maxFiles === 1 ? "a file" : `${maxFiles} files`} here or click to browse
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={maxFiles > 1}
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
        />
      </div>

      {preview && files.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-4">
          {files.map((file, i) => (
            <div key={i} className="aspect-square border rounded overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
