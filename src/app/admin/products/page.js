"use client";

import React, { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/axios";

import Button from "@/components/ui/Button";

import ProductTable from "@/components/admin/products/ProductTable";
import ProductFilter from "@/components/admin/products/ProductFilter";
import ProductModal from "@/components/admin/products/ProductModal";
import axios from "axios";
import { useToastContext } from "@/components/ui/ToastProvider";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import ReportDownloader from "@/components/ui/ReportDownload";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { addToast } = useToastContext();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/products`);
      // console.log("res", res);
      setProducts(res.data?.data || []);
    } catch (err) {
      console.error("Product fetch error:", err);
      addToast("Failed to fetch products", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/categories`);
      console.log("Categories fetched:", res?.data?.categories);
      setCategories(res?.data?.categories || []);
    } catch (err) {
      addToast("Failed to fetch categories", "error");
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

  // ✅ Add Product / Update Product
  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      // console.log("📤 Sending product data:", formData);
      if (selectedProduct) {
        // Update product
        // console.log("selectedProduct", selectedProduct._id);
        await axios.put(
          `${BASE_URL}/api/admin/products/${selectedProduct._id}`,
          formData
        );
        addToast("Product updated successfully", "success");
        setLoading(false);
      } else {
        // Create new product
        await axios.post(`${BASE_URL}/api/admin/products`, formData);
        addToast("Product created successfully", "success");
      }

      setModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
        setLoading(false);

    } catch (err) {
      console.error("Error saving product:", err);

      if (err.response?.data?.error) {
        const { message, missingFields } = err.response.data.error;

        let fullMessage = message;
        if (missingFields?.length) {
          fullMessage += `: ${missingFields.join(", ")}`;
        }

        addToast(fullMessage, "error");
        setLoading(false);

      } else {
        addToast("An unexpected error occurred", "error");
        setLoading(false);

      }
    }
  };

  const handleDelete = (id) => {
    setProductToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/products/${id}`);
      onRefresh();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Products</h2>
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setModalOpen(true);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
        <ProductFilter categories={categories} onFilter={handleFilter} />
        <ReportDownloader endpoint="products" />
      </div>

      <ProductTable
        products={products}
        onRefresh={fetchProducts}
        onEdit={(product) => {
          setSelectedProduct(product);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={productToDelete?.name}
      />

      <ProductModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleSubmit}
        categories={categories}
        product={selectedProduct}
        loading={loading}
      />
    </div>
  );
}
