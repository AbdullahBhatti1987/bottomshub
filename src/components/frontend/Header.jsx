"use client";

import { useState, useRef, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import colors from "@/theme/colors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart, FaUser, FaRegUser } from "react-icons/fa";
import OtpLoginModal from "../auth/OtpLoginModal";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { BASE_URL } from "@/lib/axios";
import { useToastContext } from "../ui/ToastProvider";
import { WishlistContext } from "@/context/WishlistContext"; 

// NavButton
function NavButton({ label, href, onClick }) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href;

  return (
    <button
      onClick={onClick ? onClick : () => router.push(href)}
      className={`group relative text-sm md:text-xs lg:text-sm font-medium tracking-wide rounded-lg overflow-hidden border shadow-md transition-all duration-500 ease-out font-sans hover:shadow-lg`}
      style={{
        borderColor: isActive ? colors.primary : colors.secondary,
        backgroundColor: isActive ? colors.primary : colors.secondary,
        color: isActive ? colors.background : colors.text,
        padding: "0.3rem 0.8rem",
      }}
    >
      <span className="relative z-10">{label}</span>
      <span
        className={`absolute top-0 left-[-75%] w-[50%] h-full transform skew-x-[25deg] transition-all duration-[1200ms] ease-out ${
          isActive ? "left-[125%]" : "group-hover:left-[125%]"
        }`}
        style={{ background: colors.shineGradient }}
      ></span>
    </button>
  );
}

// IconButton
const iconConfig = {
  heart: {
    outline: AiOutlineHeart,
    filled: AiFillHeart,
    size: 28,
    href: "/wishlist",
  },
  cart: {
    outline: FiShoppingCart,
    filled: FaShoppingCart,
    size: 28,
    href: "/cart",
  },
  user: { outline: FaRegUser, filled: FaUser, size: 24 },
};

function IconButton({ type, count = 0, isLoggedIn = false, onClick }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const { outline, filled, size } = iconConfig[type];
  const IconComponent =
    type === "user" && isLoggedIn ? filled : hover ? filled : outline;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 150);
    if (onClick) onClick();
  };

  return (
<div
  className={`relative flex items-center justify-center cursor-pointer transition-transform duration-150 ${
    active ? "scale-90" : "scale-100"
  }`}
  style={{ width: size, height: size }}
  onMouseEnter={() => setHover(true)}
  onMouseLeave={() => setHover(false)}
  onClick={handleClick}
>
  <IconComponent
    className="w-full h-full transition-colors duration-200" // icon color smoothly change
    style={{ color: colors.primary }}
  />

  {count > 0 && (
    <span
      className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-5 text-[12px] px-2 rounded-full font-bold shadow-md transition-all duration-200 ease-in-out"
      style={{
        backgroundColor: colors.badgeBg || "#EF4444",
        color: colors.badgeText || "#fff",
      }}
    >
      {count}
    </span>
  )}
</div>


  )
}

// Header
export default function Header({ className }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // categories dropdown
  const [menuOpen, setMenuOpen] = useState(false); // user menu dropdown
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
   const { wishlist } = useContext(WishlistContext);

const wishlistCount = wishlist.length;



  const router = useRouter();
  const { addToast } = useToastContext();

  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [user, setUser] = useState(null);


  // const [wishlistCount, setWishlistCount] = useState(0);
  // useEffect(() => {
  //   const storedWishlist = JSON.parse(localStorage.getItem("bottomshub_wishlist")) || [];
  //   setWishlistCount(storedWishlist.length);
  // }, []);


  const [cartCount, setCartCount] = useState(0);
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("bottomshub_cartItems")) || [];
    setCartCount(storedWishlist.length);
  }, []);



  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", hasDropdown: true },
    { label: "About", href: "/aboutus" },
    { label: "Contact", href: "/contactus" },
  ];

  // persist login state
  useEffect(() => {
    const user_token = localStorage.getItem("bottomsHub_user");
    if (user_token) {
      const userData = JSON.parse(user_token);
      setUser(userData);
    }
  }, []);

  // outside click close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/email/logout`);
      if (res.data?.success) {
        localStorage.removeItem("bottomsHub_user");
        setUser(null);
        setMenuOpen(false);
        addToast("Logout successful", "success");
        router.push("/");
      } else {
        addToast(res.data?.message || "Logout failed", "error");
      }
    } catch (err) {
      console.error("Logout error:", err);
      addToast("Logout failed", "error");
    }
  };

  const handleLoginModal = () => {
    setOtpModalOpen(true);
  };

  return (
    <header
      className={`relative w-full ${className}`}
      style={{ backgroundColor: colors.background }}
    >
      <div className="container w-full mx-auto flex items-center justify-between px-2">
        {/* Logo */}
        <div
          className="font-bold font-sans text-lg  md:text-xl lg:text-2xl"
          style={{ color: colors.primary }}
        >
          BottomsHub
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-3 lg:space-x-4 items-center">
          {menuItems.map((item) =>
            item.hasDropdown ? (
              <div
                key={item.label}
                className="relative group"
                ref={dropdownRef}
              >
                <NavButton
                  label={item.label}
                  href="#"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
                <div
                  className={`absolute top-full left-0 shadow-md mt-2 py-2 w-44 rounded-lg transform transition-all duration-200 origin-top ${
                    dropdownOpen
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0 pointer-events-none"
                  }`}
                  style={{ backgroundColor: colors.background }}
                >
                  {["Men", "Women", "Kids"].map((cat) => (
                    <button
                      key={`${item.label}-${cat}`}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm"
                      onClick={() =>
                        router.push(`/categories/${cat.toLowerCase()}`)
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <NavButton key={item.label} label={item.label} href={item.href} />
            )
          )}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-3">
          <IconButton
            type="heart"
            count={wishlistCount}
            onClick={() => router.push("/wishlist")}
          />
          <IconButton type="cart" count={cartCount} />

          {/* User icon + dropdown */}
          <div className="relative" ref={menuRef}>
            <IconButton
              type="user"
              isLoggedIn={!!user}
              onClick={() =>
                user ? setMenuOpen((prev) => !prev) : handleLoginModal()
              }
            />

            {/* Dropdown if logged in */}
            <AnimatePresence>
              {menuOpen && user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-3 z-50"
                >
                  <p className="text-sm font-medium text-gray-800 truncate px-2 mb-2">
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu + Icons */}
        <div className="flex items-center space-x-3 md:hidden">
          <IconButton
            type="heart"
            count={wishlistCount}
            onClick={() => router.push("/wishlist")}
          />
          <IconButton type="cart" count={cartCount} />
          <IconButton
            type="user"
            isLoggedIn={!!user}
            onClick={() =>
              user ? setMenuOpen((prev) => !prev) : handleLoginModal()
            }
          />

          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="w-6 h-6" style={{ color: colors.primary }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: colors.primary }} />
            )}
          </button>
        </div>
      </div>

      {/* OTP Modal */}
      {otpModalOpen && (
        <OtpLoginModal
          isOpen={otpModalOpen}
          setIsOpen={setOtpModalOpen}
          user={user}
          setUser={setUser}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`md:hidden shadow-md px-6 overflow-hidden transition-all duration-300 absolute top-full left-0 w-full ${
          mobileOpen ? "max-h-[80vh] py-2" : "max-h-0 py-0"
        }`}
        style={{ backgroundColor: colors.background }}
      >
        {menuItems.map((item) => (
          <div key={item.label} className="w-full">
            <motion.button
              key={item.label}
              style={{ color: colors.text }}
              className="block w-full text-left py-2 text-lg font-sans hover:underline transition"
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              onClick={() => {
                if (item.hasDropdown) {
                  setDropdownOpen((prev) => !prev);
                } else {
                  router.push(item.href);
                  setMobileOpen(false);
                  setDropdownOpen(false);
                }
              }}
            >
              {item.label}
            </motion.button>

            {/* Mobile Dropdown for Categories */}
            {item.hasDropdown && dropdownOpen && (
              <div className="ml-4 max-h-40 overflow-y-auto">
                {["Men", "Women", "Kids"].map((cat) => (
                  <button
                    key={`mobile-${cat}`}
                    className="block w-full text-left py-2 text-base font-sans hover:underline transition"
                    onClick={() => {
                      router.push(`/categories/${cat.toLowerCase()}`);
                      setMobileOpen(false);
                      setDropdownOpen(false);
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </header>
  );
}
