"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import colors from "@/theme/colors";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart, FaUser, FaRegUser } from "react-icons/fa";

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
        padding: "0.3rem 0.8rem", // smaller padding for compact look
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

const iconConfig = {
  heart: {
    outline: AiOutlineHeart,
    filled: AiFillHeart,
    size: 24,
    href: "/wishlist",
  },
  cart: {
    outline: FiShoppingCart,
    filled: FaShoppingCart,
    size: 24,
    href: "/cart",
  },
  user: { outline: FaRegUser, filled: FaUser, size: 22, href: "/profile" },
};

function IconButton({ type, count = 0, isLoggedIn = false }) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const router = useRouter();

  const { outline, filled, size, href } = iconConfig[type];
  const IconComponent =
    hover && (type !== "user" || isLoggedIn) ? filled : outline;

  const handleClick = () => {
    setActive(true);
    setTimeout(() => setActive(false), 150); // click animation
    if (href) router.push(href);
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
        className="w-full h-full"
        style={{ color: colors.primary }}
      />
      {count > 0 && (
        <span
          className="absolute -top-1 -right-1 text-[10px] px-1 rounded-full font-semibold"
          style={{ backgroundColor: colors.badgeBg, color: colors.badgeText }}
        >
          {count}
        </span>
      )}
    </div>
  );
}

export default function Header({ className }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const wishlistCount = 0;
  const cartCount = 0;
  const isLoggedIn = true; // or pass as prop

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", hasDropdown: true },
    { label: "About", href: "/aboutus" },
    { label: "Contact", href: "/contactus" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`relative shadow-md rounded-2xl ${className}`}
      style={{ backgroundColor: colors.background }}
    >
      <div className="container w-full md:w-[90%] lg:w-[85%] mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo */}
        <div
          className="font-bold font-sans text-2xl sm:text-3xl md:text-3xl lg:text-4xl"
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
          <IconButton type="heart" count={wishlistCount} />
          <IconButton type="cart" count={cartCount} />
          <IconButton type="user" isLoggedIn={isLoggedIn} />
        </div>

        {/* Mobile Menu + Icons */}
        <div className="flex items-center space-x-3 md:hidden">
          <IconButton type="heart" count={wishlistCount} />
          <IconButton type="cart" count={cartCount} />
          <IconButton type="user" isLoggedIn={isLoggedIn} />
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? (
              <X className="w-6 h-6" style={{ color: colors.primary }} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: colors.primary }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <div
        className={`md:hidden shadow-md px-6 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-84 py-4" : "max-h-0 py-0"
        }`}
        style={{ backgroundColor: colors.background }}
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            style={{ color: colors.text }}
            className="block w-full text-left py-3 text-lg font-sans hover:underline transition"
          >
            {item.label}
          </button>
        ))}
      </div> */}
      <div
        className={`md:hidden shadow-md px-6 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 py-2" : "max-h-0 py-0"
        }`}
        style={{ backgroundColor: colors.background }}
      >
        {menuItems.map((item) => (
          <button
            key={item.label}
            style={{ color: colors.text }}
            className="block w-full text-left py-2 text-lg font-sans hover:underline transition"
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
