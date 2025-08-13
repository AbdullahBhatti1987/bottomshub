// /src/components/frontend/Reviews.jsx
"use client";
export default function Reviews() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded">
          <p>"Amazing service and products!"</p>
          <p className="mt-2 font-bold">- John Doe</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <p>"Fast delivery and quality items."</p>
          <p className="mt-2 font-bold">- Jane Smith</p>
        </div>
        <div className="bg-white p-6 shadow rounded">
          <p>"Highly recommend BTH-ECOM!"</p>
          <p className="mt-2 font-bold">- Ali Khan</p>
        </div>
      </div>
    </section>
  );
}
