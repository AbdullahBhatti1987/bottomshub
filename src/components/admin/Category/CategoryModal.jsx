"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";

export default function CategoryModal({ isOpen, onClose, onSubmit, category = null }) {
  const [form, setForm] = useState({ name: "", slug: "", image: "" });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        slug: category.slug || "",
        image: category.image || "",
      });
    } else {
      setForm({ name: "", slug: "", image: "" });
    }
  }, [category]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setForm({ ...form, image: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={category ? "Edit Category" : "Add New Category"}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <Input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <Input name="slug" value={form.slug} onChange={handleChange} required />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Image</label>
          <FileUpload onUploaded={handleImageUpload} defaultImage={form.image} />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{category ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
