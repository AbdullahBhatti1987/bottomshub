// /src/components/frontend/Testimonials.jsx
"use client";
export default function Testimonials() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 shadow rounded bg-gray-50">
            <p>"BTH-ECOM made shopping so easy and fast!"</p>
            <p className="mt-4 font-bold">- Sara Ali</p>
          </div>
          <div className="p-6 shadow rounded bg-gray-50">
            <p>"High quality products and amazing support."</p>
            <p className="mt-4 font-bold">- Ahmed Khan</p>
          </div>
          <div className="p-6 shadow rounded bg-gray-50">
            <p>"I always recommend BTH-ECOM to my friends."</p>
            <p className="mt-4 font-bold">- Fatima Noor</p>
          </div>
        </div>
      </div>
    </section>
  );
}
