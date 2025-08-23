// "use client";

// import { useState, useEffect, useContext } from "react";
// import Link from "next/link";
// import { Home, LayoutGrid, Heart, ShoppingCart, User } from "lucide-react";
// import { CartContext } from "@/context/CartContext";
// import { WishlistContext } from "@/context/WishlistContext";
// import { useToastContext } from "@/components/ui/ToastProvider";

// export default function MobileTabBar() {
// //   const { cart } = useCartContext();
//   const { cart } = useContext(CartContext);
//   const { wishlist } = useContext(WishlistContext);

//   const { addToast } = useToastContext();

//   const [user, setUser] = useState(null);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);

//   // Load user from localStorage
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const storedUser = localStorage.getItem("bottomsHub_user");
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("bottomsHub_user");
//     setUser(null);
//     setIsProfileOpen(false);
//     addToast("Logged out successfully", "success");
//   };

//   return (
//     <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-2 sm:hidden">
//       {/* Home */}
//       <Link href="/" className="flex flex-col items-center text-gray-600 hover:text-black">
//         <Home size={22} />
//         <span className="text-xs">Home</span>
//       </Link>

//       {/* Categories */}
//       <Link href="/products" className="flex flex-col items-center text-gray-600 hover:text-black">
//         <LayoutGrid size={22} />
//         <span className="text-xs">Products</span>
//       </Link>

//       {/* Wishlist */}
//       <Link href="/wishlist" className="relative flex flex-col items-center text-gray-600 hover:text-black">
//         <Heart size={22} />
//         {wishlist?.length > 0 && (
//           <span className="absolute -top-1 right-3 bg-red-500 text-white text-[10px] rounded-full px-1">
//             {wishlist.length}
//           </span>
//         )}
//         <span className="text-xs">Wishlist</span>
//       </Link>

//       {/* Cart */}
//       <Link href="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-black">
//         <ShoppingCart size={22} />
//         {cart?.length > 0 && (
//           <span className="absolute -top-1 right-3 bg-green-500 text-white text-[10px] rounded-full px-1">
//             {cart.length}
//           </span>
//         )}
//         <span className="text-xs">Cart</span>
//       </Link>

//       {/* User */}
//       <div
//         onClick={() => setIsProfileOpen(!isProfileOpen)}
//         className="flex flex-col items-center text-gray-600 hover:text-black cursor-pointer relative"
//       >
//         <User size={22} />
//         <span className="text-xs">Account</span>
//       </div>

//       {/* Profile Modal */}
//       {isProfileOpen && (
//         <div className="absolute bottom-14 right-2 bg-white shadow-lg rounded-lg border p-4 w-56">
//           {user ? (
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center gap-2">
//                 <User className="w-8 h-8 text-gray-500" />
//                 <div>
//                   <p className="text-sm font-medium">{user.name || "User"}</p>
//                   <p className="text-xs text-gray-500">{user.email || user.mobile}</p>
//                 </div>
//               </div>
//               <Link
//                 href="/profile"
//                 className="text-sm text-blue-600 hover:underline"
//                 onClick={() => setIsProfileOpen(false)}
//               >
//                 My Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="mt-2 text-sm bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <Link
//                 href="#"
//                 onClick={() => {
//                   setIsProfileOpen(false);
//                   document.dispatchEvent(new Event("openAuthModal"));
//                 }}
//                 className="text-sm bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 text-center"
//               >
//                 Login / Signup
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 active path detect
import { Home, LayoutGrid, Heart, ShoppingCart, User } from "lucide-react";
import { CartContext } from "@/context/CartContext";
import { WishlistContext } from "@/context/WishlistContext";
import { useToastContext } from "@/components/ui/ToastProvider";
import colors from "@/theme/colors"; // 👈 import your colors.js

export default function MobileTabBar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { addToast } = useToastContext();

  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Load user from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("bottomsHub_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bottomsHub_user");
    setUser(null);
    setIsProfileOpen(false);
    addToast("Logged out successfully", "success");
  };

  // 🔥 utility for active check
  const isActive = (path) => pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg flex justify-around items-center py-2 sm:hidden">
      {/* Home */}
      <Link
        href="/"
        className={`relative flex flex-col items-center ${
          isActive("/") ? `text-[${colors.primary}]` : "text-gray-600"
        } hover:text-black`}
      >
        <Home size={22} />
        <span className="text-xs">Home</span>
      </Link>

      {/* Products */}
      <Link
        href="/products"
        className={`relative flex flex-col items-center ${
          isActive("/products") ? `text-[${colors.primary}]` : "text-gray-600"
        } hover:text-black`}
      >
        <LayoutGrid size={22} />
        <span className="text-xs">Products</span>
      </Link>

      {/* Wishlist */}
      <Link
        href="/wishlist"
        className={`relative flex flex-col items-center ${
          isActive("/wishlist") ? `text-[${colors.primary}]` : "text-gray-600"
        } hover:text-black`}
      >
        <Heart size={22} />
        {wishlist?.length > 0 && (
          <span
             className="absolute -top-1 right-1 text-white text-[10px] rounded-full px-1"
            style={{ backgroundColor: colors.primary }}
          >
            {wishlist.length}
          </span>
        )}
        <span className="text-xs">Wishlist</span>
      </Link>

      {/* Cart */}
      <Link
        href="/cart"
        className={`relative flex flex-col items-center ${
          isActive("/cart") ? `text-[${colors.primary}]` : "text-gray-600"
        } hover:text-black`}
      >
        <ShoppingCart size={22} />
        {cart?.length > 0 && (
          <span
            className="absolute -top-1 -right-2 text-white text-[10px] rounded-full px-1"
            style={{ backgroundColor: colors.primary }}
          >
            {cart.length}
          </span>
        )}
        <span className="text-xs">Cart</span>
      </Link>

      {/* Account */}
      <div
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className={`relative flex flex-col items-center cursor-pointer ${
          isActive("/profile") ? `text-[${colors.primary}]` : "text-gray-600"
        } hover:text-black`}
      >
        <User size={22} />
        <span className="text-xs">Account</span>
      </div>

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="absolute bottom-14 right-2 bg-white shadow-lg rounded-lg border p-4 w-56">
          {user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <User className="w-8 h-8 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{user.name || "User"}</p>
                  <p className="text-xs text-gray-500">
                    {user.email || user.mobile}
                  </p>
                </div>
              </div>
              <Link
                href="/profile"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setIsProfileOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="mt-2 text-sm bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="#"
                onClick={() => {
                  setIsProfileOpen(false);
                  document.dispatchEvent(new Event("openAuthModal"));
                }}
                className="text-sm bg-blue-500 text-white rounded px-3 py-1 hover:bg-blue-600 text-center"
              >
                Login / Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
