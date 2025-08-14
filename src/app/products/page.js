"use client";
import { useState } from "react";
import ProductCard from "@/components/products/ProductCard";

const productsData = [
  {
    id: 1,
    name: "Classic White Sneakers",
    slug: "classic-white-sneakers",
    price: 2999,
    originalPrice: 3999,
    tags: "sale",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
      },
    ],
    inStock: true,
  },
  {
    id: 2,
    name: "Leather Office Bag",
    slug: "leather-office-bag",
    price: 5499,
    originalPrice: 5499,
    tags: "new arrival",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80",
      },
    ],
    inStock: true,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    price: 7999,
    originalPrice: 8999,
    tags: "sale",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&q=80",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&q=80",
      },
    ],
    inStock: false,
  },
  {
    id: 4,
    name: "Casual Cotton T-Shirt",
    slug: "casual-cotton-tshirt",
    price: 1499,
    originalPrice: 1499,
    tags: "new arrival",
    images: [
      {
        url: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
      },
    ],
    inStock: true,
  },
];

export default function ProductsPage() {
  const [products] = useState(productsData);

  return (
    <div className="px-4 md:px-10 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        🛍️ Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
