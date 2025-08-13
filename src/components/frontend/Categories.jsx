// /src/components/Categories.jsx
"use client";
export default function Categories() {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl font-bold mb-8">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4 text-center">Category 1</div>
        <div className="bg-white shadow rounded p-4 text-center">Category 2</div>
        <div className="bg-white shadow rounded p-4 text-center">Category 3</div>
        <div className="bg-white shadow rounded p-4 text-center">Category 4</div>
      </div>
    </section>
  );
}
