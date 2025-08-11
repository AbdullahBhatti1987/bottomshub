"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import BrandModal from "@/components/admin/brands/BrandModal";
import BrandTable from "@/components/admin/brands/BrandTable";
import ConfirmDeleteModal from "@/components/ui/ConfirmDeleteModal";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import { useToastContext } from "@/components/ui/ToastProvider";

import { BASE_URL } from "@/lib/axios";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);

  const { addToast } = useToastContext();

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/brands`);
      console.log("Fetched Brands:", res.data);
      setBrands(res.data || []);
    } catch (err) {
      addToast("Failed to fetch brands", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      if (selectedBrand) {
        // Update brand
        await axios.put(`${BASE_URL}/api/admin/brands/${selectedBrand._id}`, formData);
        addToast("Brand updated successfully", "success");
      } else {
        // Create brand
        await axios.post(`${BASE_URL}/api/admin/brands`, formData);
        addToast("Brand added successfully", "success");
      }
      setModalOpen(false);
      setSelectedBrand(null);
      fetchBrands();
    } catch (err) {
      addToast("Failed to save brand", "error");
    }
  };

  const handleDelete = (brand) => {
    setBrandToDelete(brand);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/admin/brands/${brandToDelete._id}`);
      addToast("Brand deleted successfully", "success");
      setDeleteModalOpen(false);
      setBrandToDelete(null);
      fetchBrands();
    } catch (err) {
      addToast("Failed to delete brand", "error");
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Brands</h2>
        <Button
          onClick={() => {
            setSelectedBrand(null);
            setModalOpen(true);
          }}
        >
          Add Brand
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <BrandTable brands={brands} onEdit={setSelectedBrand} onDelete={handleDelete} />
      )}

      <BrandModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBrand(null);
        }}
        onSubmit={handleSubmit}
        brand={selectedBrand}
        disabled={loading}
      />

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={brandToDelete?.name}
      />
    </div>
  );
}
