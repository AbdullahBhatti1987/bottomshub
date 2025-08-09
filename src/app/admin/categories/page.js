"use client";

import { useEffect, useState } from "react";
import CategoryTable from "@/components/admin/category/CategoryTable";
// import CategoryModal from '@/components/admin/category/CategoryModal';
import CategoryFilter from "@/components/admin/category/CategoryFilter";
import Button from "@/components/ui/Button";
// import  toast from '@/components/ui/Toast';
import { BASE_URL } from "@/lib/axios";
import axios from "axios";
import CategoryModal from "@/components/admin/Category/CategoryModal";
import { useToastContext } from "@/components/ui/ToastProvider";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import Loader from "@/components/ui/Loader";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const { addToast } = useToastContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    fetchCategories();
  }, []);

  // Filter categories by search input
  useEffect(() => {
    const filtered = categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  }, [search, categories]);

  const handleCreate = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleEdit = (category) => {
    console.log("category=>", category);
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setCategoryToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      console.log("category", categoryToDelete);
      await axios.delete(
        `${BASE_URL}/api/admin/categories/${categoryToDelete}`
      );
      addToast("Category deleted", "success");
      fetchCategories();
    } catch (err) {
      addToast("Failed to delete category", "error");
    } finally {
      setDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
        console.log("data", data);
        console.log("selectedCategory", selectedCategory);
        const res = await axios.put(
          `${BASE_URL}/api/admin/categories/${selectedCategory._id}`,
          data
        );
        addToast("Category updated", "success");
      } else {
        const res = await axios.post(`${BASE_URL}/api/admin/categories`, data);
        console.log("res", res);
        addToast("Category created", "success");
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      addToast("Failed to save category", "error");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Categories</h1>
        <Button onClick={handleCreate}>Add Category</Button>
      </div>

      <CategoryFilter search={search} setSearch={setSearch} />

      {loading ? (
        <Loader />
      ) : (
        <CategoryTable
          categories={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={categoryToDelete?.name}
      />

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
         disabled={loading}
        category={selectedCategory}
      />
    </div>
  );
}
