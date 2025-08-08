// "use client";

// import { useEffect } from "react";
// import { createPortal } from "react-dom";
// import Button from "./Button";

// export default function Modal({ isOpen, onClose, title, children }) {
//   // Escape key press to close modal
//   useEffect(() => {
//     function handleEsc(e) {
//       if (e.key === "Escape") onClose();
//     }
//     if (isOpen) {
//       document.addEventListener("keydown", handleEsc);
//     }
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [isOpen, onClose]);

//   // Prevent scrolling behind modal
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
//       <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative max-h-[90vh] flex flex-col">
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="text-lg font-semibold">{title}</h2>
//           <Button variant="ghost" size="sm" onClick={onClose}>
//             ✕
//           </Button>
//         </div>

//         <div>{children}</div>

//         <div className="mt-6 text-right">
//           {/* <Button onClick={onClose}>Close</Button> */}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// }


"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function Modal({ isOpen, onClose, title, children, showFooter = false, footerContent = null }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-5 py-4 flex-1">
          {children}
        </div>

        {/* Optional footer */}
        {showFooter && (
          <div className="px-5 py-4 border-t bg-white text-right">
            {footerContent || (
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
