// /src/components/frontend/SubscriptionBox.jsx
"use client";
export default function SubscriptionBox() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
        <p className="mb-6">Get latest updates and offers directly in your inbox.</p>
        <div className="flex justify-center space-x-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l w-full text-gray-900"
          />
          <button className="bg-blue-600 text-white px-6 rounded-r hover:bg-blue-700">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
