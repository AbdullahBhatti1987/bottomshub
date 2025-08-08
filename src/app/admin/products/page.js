// app/admin/products/page.jsx
"use client";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/axios";

import Button  from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductFilter from "@/components/admin/products/ProductFilter";
import ProductModal from "@/components/admin/products/ProductModal";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
       const res = await axios.get(`${BASE_URL}/api/admin/products`);
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={() => setModalOpen(true)}>Add Product</Button>
      </div>

      <ProductFilter onSearch={fetchProducts} />

      {loading ? (
        <Loader label="Loading products..." center />
      ) : products.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <ProductTable products={products} onRefresh={fetchProducts} />
      )}

      <ProductModal open={modalOpen} setOpen={setModalOpen} onRefresh={fetchProducts} />
    </div>
  );
}
