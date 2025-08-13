// /src/components/NewArrivals.jsx
"use client";
export default function NewArrivals() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4 text-center">Product 1</div>
        <div className="bg-white shadow rounded p-4 text-center">Product 2</div>
        <div className="bg-white shadow rounded p-4 text-center">Product 3</div>
        <div className="bg-white shadow rounded p-4 text-center">Product 4</div>
      </div>
    </section>
  );
}
