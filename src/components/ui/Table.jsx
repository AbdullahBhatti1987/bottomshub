import { ArrowUp, ArrowDown } from "lucide-react";

// export function Table({ children }) {
//   return (
//     <table className="min-w-full text-sm text-left divide-y divide-gray-200">
//       {children}
//     </table>
//   );
// }

export function TableHeader({ children }) {
  return (
    <thead className="bg-gray-100 text-gray-700 font-semibold">
      {children}
    </thead>
  );
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-gray-100">{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

// export function TableHead({
//   children,
//   sortable = false,
//   sortKey = "",
//   sortConfig = {},
//   onSort = () => {},
// }) {
//   const isActive = sortConfig.key === sortKey;

//   return (
//     <th
//       className={`px-4 py-2 relative ${
//         children === "Actions" ? "text-center" : "text-left"
//       } text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap`}
//     >
//       <div className="flex items-center justify-between w-full">
//         <span>{children}</span>
//         {sortable && (
//           <div className="inline-flex items-center ml-2">
//             <button
//               type="button"
//               className={`p-0 leading-none ${
//                 isActive && sortConfig.direction === "asc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "asc")}
//             >
//               <ArrowDown size={14} />
//             </button>
//             <button
//               type="button"
//               className={`p-0 leading-none ml-1 ${
//                 isActive && sortConfig.direction === "desc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "desc")}
//             >
//               <ArrowUp size={14} />
//             </button>
//           </div>
//         )}
//       </div>
//     </th>
//   );
// }

// export function TableCell({
//   children,
//   className = "",
//   truncate = 0,
//   fixedHeight = "h-12",
//   ...rest
// }) {
//   let content = children;

//   if (truncate > 0 && typeof children === "string") {
//     content =
//       children.length > truncate
//         ? `${children.slice(0, truncate)}...`
//         : children;
//   }

//   return (
//     <td
//       className={`px-4 py-2 text-gray-800 whitespace-nowrap overflow-hidden ${fixedHeight} ${className}`}
//       {...rest}
//       style={{ maxWidth: "250px" }}
//     >
//       {content}
//     </td>
//   );
// }

// export function Table({ children }) {
//   return (
//     <table className="min-w-full text-xs sm:text-sm md:text-base text-left divide-y divide-gray-200">
//       {children}
//     </table>
//   );
// }

export function Table({ children }) {
  return (
    <table className="min-w-full text-xs sm:text-sm md:text-base text-left divide-y divide-gray-200 whitespace-normal sm:whitespace-nowrap">
      {children}
    </table>
  );
}

// export function TableHead({
//   children,
//   sortable = false,
//   sortKey = "",
//   sortConfig = {},
//   onSort = () => {},
// }) {
//   const isActive = sortConfig.key === sortKey;

//   return (
//     <th
//       // className={`px-2 sm:px-3 md:px-4 py-2 relative ${
//       //   children === "Actions" ? "text-center" : "text-left"
//       // } text-[10px] sm:text-xs md:text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap`}

//       className={`px-2 sm:px-3 md:px-4 py-2 relative ${
//         children === "Actions" ? "text-center" : "text-left"
//       } text-[12px] sm:text-[14px] md:text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap`}
//     >
//       <div className="flex items-center justify-between w-full">
//         <span>{children}</span>
//         {sortable && (
//           <div className="inline-flex items-center ml-1 sm:ml-2">
//             <button
//               type="button"
//               className={`p-0 leading-none ${
//                 isActive && sortConfig.direction === "asc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "asc")}
//             >
//               <ArrowDown
//                 size={12}
//                 className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
//               />
//             </button>
//             <button
//               type="button"
//               className={`p-0 leading-none ml-0.5 sm:ml-1 ${
//                 isActive && sortConfig.direction === "desc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "desc")}
//             >
//               <ArrowUp size={12} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </th>
//   );
// }

export function TableHead({
  children,
  sortable = false,
  sortKey = "",
  sortConfig = {},
  onSort = () => {},
}) {
  const isActive = sortConfig.key === sortKey;

  return (
    <th
      // className={`px-2 sm:px-3 md:px-4 py-2 relative ${
      //   children === "Actions" ? "text-center" : "text-left"
      // } text-[10px] sm:text-[11px] md:text-[12px] lg:text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap`}
      className="
  px-1 sm:px-2 md:px-3 h-12
  text-[8px] sm:text-[9px] md:text-[12px] lg:text-[13px] xl:text-[14px] 
  font-medium tracking-wide text-gray-600 whitespace-nowrap
"
    >
      <div className="flex items-center justify-between w-full">
        <span>{children}</span>
        {sortable && (
          <div className="inline-flex items-center ml-1 sm:ml-2">
            <button
              type="button"
              className={`p-0 leading-none ${
                isActive && sortConfig.direction === "asc"
                  ? "text-black"
                  : "text-gray-400"
              }`}
              onClick={() => onSort(sortKey, "asc")}
            >
              <ArrowDown size={12} className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </button>
            <button
              type="button"
              className={`p-0 leading-none ml-0.5 sm:ml-1 ${
                isActive && sortConfig.direction === "desc"
                  ? "text-black"
                  : "text-gray-400"
              }`}
              onClick={() => onSort(sortKey, "desc")}
            >
              <ArrowUp size={12} className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </button>
          </div>
        )}
      </div>
    </th>
  );
}

// export function TableCell({
//   children,
//   className = "",
//   truncate = 0,
//   fixedHeight = "h-12",
//   ...rest
// }) {
//   let content = children;

//   if (truncate > 0 && typeof children === "string") {
//     content =
//       children.length > truncate
//         ? `${children.slice(0, truncate)}...`
//         : children;
//   }

//   return (
//     <td
//       className={`px-2 sm:px-3 md:px-4 text-[12px] sm:text-[14px] md:text-sm text-gray-800 whitespace-nowrap overflow-hidden ${fixedHeight} ${className}`}
//       {...rest}
//       style={{ maxWidth: "250px" }}
//     >
//       {content}
//     </td>
//   );
// }

// ye ab tak use nahi kia hai wo component hai

// export function TableHead({
//   children,
//   sortable = false,
//   sortKey = "",
//   sortConfig = {},
//   onSort = () => {},
// }) {
//   const isActive = sortConfig.key === sortKey;

//   return (
//     <th
//       className={`px-2 sm:px-3 md:px-4 py-2 relative ${
//         children === "Actions" ? "text-center" : "text-left"
//       } text-[8px] sm:text-[10px] md:text-sm font-medium tracking-wide text-gray-600 whitespace-nowrap`}
//     >
//       <div className="flex items-center justify-between w-full">
//         <span>{children}</span>
//         {sortable && (
//           <div className="inline-flex items-center ml-1 sm:ml-2">
//             <button
//               type="button"
//               className={`p-0 leading-none ${
//                 isActive && sortConfig.direction === "asc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "asc")}
//             >
//               <ArrowDown
//                 size={12}
//                 className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
//               />
//             </button>
//             <button
//               type="button"
//               className={`p-0 leading-none ml-0.5 sm:ml-1 ${
//                 isActive && sortConfig.direction === "desc"
//                   ? "text-black"
//                   : "text-gray-400"
//               }`}
//               onClick={() => onSort(sortKey, "desc")}
//             >
//               <ArrowUp size={12} className="sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </th>
//   );
// }

// export function TableCell({
//   children,
//   className = "",
//   truncate = 0,
//   fixedHeight = "h-12",
//   ...rest
// }) {
//   let content = children;

//   if (truncate > 0 && typeof children === "string") {
//     content =
//       children.length > truncate
//         ? `${children.slice(0, truncate)}...`
//         : children;
//   }

//   return (
//     <td
//       className={`px-2 sm:px-3 md:px-4 text-[8px] sm:text-[10px] md:text-sm text-gray-800 whitespace-nowrap overflow-hidden ${fixedHeight} ${className}`}
//       {...rest}
//       style={{ maxWidth: "250px" }}
//     >
//       {content}
//     </td>
//   );
// }

export function TableCell({
  children,
  className = "",
  truncate = 0,
  fixedHeight = "h-12",
  ...rest
}) {
  let content = children;

  if (truncate > 0 && typeof children === "string") {
    content =
      children.length > truncate
        ? `${children.slice(0, truncate)}...`
        : children;
  }

  return (
    <td
      className={`
    
        
       
      className="
  px-1 sm:px-2 md:px-3 h-12
  text-[8px] sm:text-[9px] md:text-[12px] lg:text-[13px] xl:text-[14px] 
  font-medium tracking-wide text-gray-600 whitespace-nowrap

        ${fixedHeight} ${className}`}
      {...rest}
      style={{ maxWidth: "250px" }}
    >
      {content}
    </td>
  );
}
