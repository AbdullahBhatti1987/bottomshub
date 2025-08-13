"use client"; // Client Component

import { useState } from "react";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">BTH-ECOM</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <button className="hover:text-blue-500">Home</button>
          <button className="hover:text-blue-500">Products</button>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:text-blue-500 flex items-center gap-1"
            >
              Categories
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md mt-2 py-2 w-48">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Men
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Women
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                  Kids
                </button>
              </div>
            )}
          </div>
          <button className="hover:text-blue-500">About</button>
          <button className="hover:text-blue-500">Contact</button>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Heart className="w-5 h-5 cursor-pointer" />
          <ShoppingCart className="w-5 h-5 cursor-pointer" />
          <User className="w-5 h-5 cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md px-6 py-4 space-y-2">
          <button className="block w-full text-left hover:text-blue-500">Home</button>
          <button className="block w-full text-left hover:text-blue-500">Products</button>
          <button className="block w-full text-left hover:text-blue-500">Categories</button>
          <button className="block w-full text-left hover:text-blue-500">About</button>
          <button className="block w-full text-left hover:text-blue-500">Contact</button>
        </nav>
      )}
    </header>
  );
}
