// "use client";
// import { usePathname } from "next/navigation";

// const NavButton = ({ label, onClick, href }) => {
//   const pathname = usePathname();
//   const isActive = pathname === href; // current route match

//   return (
//     <button
//       onClick={onClick}
//       className={`group relative px-5 py-1.5 text-sm font-medium tracking-wide rounded-lg overflow-hidden border shadow-md transition-all duration-700 ease-out font-sans
//         ${isActive 
//           ? "border-black bg-black text-white shadow-lg" 
//           : "border-gray-300 bg-gray-100 text-black hover:shadow-lg hover:text-white hover:bg-black"
//         }`}
//     >
//       <span className="relative z-10">{label}</span>

//       {/* Shine effect */}
//       <span
//         className={`absolute top-0 left-[-75%] w-[50%] h-full bg-white/20 transform skew-x-[25deg] transition-all duration-[1800ms] ease-out
//           ${isActive ? "left-[125%]" : "group-hover:left-[125%]"}
//         `}
//       ></span>
//     </button>
//   );
// };

// export default NavButton;
