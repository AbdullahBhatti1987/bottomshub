'use client';

import { useEffect, useState } from 'react';
import CategoryTable from '@/components/admin/category/CategoryTable';
import CategoryModal from '@/components/admin/category/CategoryModal';
import CategoryFilter from '@/components/admin/category/CategoryFilter';
import Button from '@/components/ui/Button';
import  toast from '@/components/ui/Toast';
import { BASE_URL } from '@/lib/axios';
import axios from 'axios';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch all categories
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/categories`);
      setCategories(res.data?.data || []);
    } catch (err) {
      toast.error('Failed to fetch categories');
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
    setSelectedCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`${BASE_URL}/api/categories/${id}`);
      toast.success('Category deleted');
      fetchCategories();
    } catch (err) {
      toast.error('Failed to delete category');
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedCategory) {
        await axios.put(`${BASE_URL}/api/categories/${selectedCategory._id}`, data);
        toast.success('Category updated');
      } else {
        await axios.post(`${BASE_URL}/api/categories`, data);
        toast.success('Category created');
      }
      setModalOpen(false);
      fetchCategories();
    } catch (err) {
      toast.error('Failed to save category');
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
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <CategoryTable
          categories={filtered}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <CategoryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        category={selectedCategory}
      />
    </div>
  );
}
