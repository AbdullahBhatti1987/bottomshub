"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ name, price, images, slug }) {
  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <Link href={`/products/${slug}`}>
        <div className="relative w-full h-64">
          <Image
            src={images && images.length > 0 ? images[0].url : "/images/placeholder.png"}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="font-bold text-primary">{price}</p>
        </div>
      </Link>
    </div>
  );
}
