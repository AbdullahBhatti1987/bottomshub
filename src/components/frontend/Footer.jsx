// /src/components/Footer.jsx
"use client";

import Link from "next/link";
import colors from "@/theme/colors";

export default function Footer() {
  return (
    <footer
      className="bg-gray-900 text-gray-300 pt-6"
      style={{ backgroundColor: colors.primaryDark }}
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {/* About */}
        <div>
          <h3 className="text-base font-semibold text-white mb-2">About Us</h3>
          <p className="text-xs leading-5 text-gray-400">
            BottomsHub is your trusted e-commerce platform, delivering quality
            products with a seamless shopping experience.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Categories</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <Link href="/products" className="hover:text-white transition">
                Men
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Women
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Kids
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-white transition">
                Accessories
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Support</h3>
          <ul className="space-y-1 text-xs">
            <li>
              <Link href="/contactus" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-white transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/help-center" className="hover:text-white transition">
                Help Center
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-base font-semibold text-white mb-2">
            Stay Updated
          </h3>
          <p className="text-xs text-gray-400 mb-2">
            Subscribe for offers & updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="email"
              placeholder="Email"
              className="px-3 py-3 rounded-md bg-white text-gray-900 text-xs flex-1 outline-none w-full sm:w-auto"
              style={{ backgroundColor: colors.white }}
            />
            <button
              className="text-white text-xs font-bold px-3 py-1 rounded-md transition w-full sm:w-auto"
              style={{ backgroundColor: colors.primary }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-6 py-3">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} BottomsHub. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
