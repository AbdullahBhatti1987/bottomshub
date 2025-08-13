// /src/components/Footer.jsx
"use client";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">About Us</h3>
          <p>We provide the best ecommerce platform.</p>
        </div>
        <div>
          <h3 className="font-bold mb-4">Categories</h3>
          <ul>
            <li className="hover:text-blue-400 cursor-pointer">Category 1</li>
            <li className="hover:text-blue-400 cursor-pointer">Category 2</li>
            <li className="hover:text-blue-400 cursor-pointer">Category 3</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul>
            <li className="hover:text-blue-400 cursor-pointer">Help Center</li>
            <li className="hover:text-blue-400 cursor-pointer">Contact Us</li>
            <li className="hover:text-blue-400 cursor-pointer">FAQs</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">Subscribe</h3>
          <input
            type="email"
            placeholder="Your email"
            className="p-2 rounded text-gray-900 w-full mb-2"
          />
          <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 w-full">
            Subscribe
          </button>
        </div>
      </div>
      <div className="text-center mt-10 text-gray-400">
        &copy; {new Date().getFullYear()} BTH-ECOM-NEUTRAL-A1. All rights reserved.
      </div>
    </footer>
  );
}
