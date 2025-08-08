// app/admin/products/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/axios";

import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductFilter from "@/components/admin/products/ProductFilter";
import ProductModal from "@/components/admin/products/ProductModal";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/categories`);
      console.log("Image URL:", res?.data?.data);
      setCategories(res.data?.data || []);
    } catch (err) {
      addToast("Failed to fetch categories", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleFilter = async (filters) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products`, {
        params: filters,
      });
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error("Error filtering products:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button onClick={() => setModalOpen(true)}>Add Product</Button>
      </div>

      <ProductFilter categories={categories} onFilter={handleFilter} />

      {loading ? (
        <Loader label="Loading products..." center />
      ) : products.length === 0 ? (
        <EmptyState message="No products found." />
      ) : (
        <ProductTable products={products} onRefresh={fetchProducts} />
      )}

      {/* <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(formData) => {
          console.log("Handle Submit:", formData); // You can add your submit logic here
          setModalOpen(false);
          fetchProducts();
        }}
        categories={[]} // Pass categories if needed
      /> */}

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(formData) => {
          setModalOpen(false);
          fetchProducts();
        }}
        categories={categories} // ✅ Pass this
      />
    </div>
  );
}
