// "use client";
// import { createContext, useContext, useState, useCallback } from "react";
// import Toast from "./Toast";

// const ToastContext = createContext();

// export function ToastProvider({ children }) {
//   const [toasts, setToasts] = useState([]);

//   const addToast = useCallback((message, type = "info") => {
//     const id = Date.now();
//     const newToast = { id, message, type };

//     setToasts((prev) => [...prev, newToast]);

//     setTimeout(() => {
//       setToasts((prev) => prev.filter((toast) => toast.id !== id));
//     }, 3000); // auto dismiss after 3s
//   }, []);

//   return (
//     <ToastContext.Provider value={{ addToast }}>
//       {children}
//      <div className="fixed top-[100px] right-4 z-[9999] flex flex-col space-y-2">
//         {toasts.map((toast) => (
//           <Toast key={toast.id} type={toast.type} message={toast.message} />
//         ))}
//       </div>
//     </ToastContext.Provider>
//   );
// }

// export const useToastContext = () => useContext(ToastContext);

"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "./Toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 1500);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <div className="fixed top-[100px] right-4 z-[9999] flex flex-col space-y-2">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <Toast type={toast.type} message={toast.message} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export const useToastContext = () => useContext(ToastContext);
