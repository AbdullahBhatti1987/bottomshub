// import { useEffect } from "react";

// export default function Drawer({
//   isOpen,
//   onClose,
//   title = "Drawer",
//   children,
//   position = "right", // "left" ya "right"
//   width = "w-[400px]",
// }) {
//   useEffect(() => {
//     if (isOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [isOpen]);

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* Drawer Panel */}
//       <div
//         className={`fixed top-0 ${position}-0 h-full z-50 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
//         ${isOpen ? "translate-x-0" : position === "right" ? "translate-x-full" : "-translate-x-full"} ${width}
//         `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b">
//           <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-800"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Body */}
//         <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">{children}</div>
//       </div>
//     </>
//   );
// }



import { useEffect } from "react";

export default function Drawer({
  isOpen,
  onClose,
  title = "Drawer",
  children,
  position = "right", // "left" or "right"
  width = "w-[400px]",
}) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        position === "left" ? "justify-start" : "justify-end"
      } ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Box */}
      <div
        className={`bg-white h-full shadow-lg transform transition-transform duration-300 ${width}
        ${position === "left" ? (isOpen ? "translate-x-0" : "-translate-x-full") : isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
