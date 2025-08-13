"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import FileUpload from "@/components/ui/FileUpload";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  category = null,
  loading,
  viewMode = false,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        slug: category.slug || "",
        image: category.image || "",
        description: category.description || "",
      });
    } else {
      setForm({ name: "", slug: "", image: "", description: "" });
    }
  }, [category]);

  useEffect(() => {
    if (form.name && !category) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  }, [form.name]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (url) => {
    setForm({ ...form, image: url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        viewMode
          ? "View Category"
          : category
          ? "Edit Category"
          : "Add New Category"
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
           disabled={loading || viewMode} 
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <Input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            readOnly
            disabled={loading || viewMode}
          />
        </div>
        <div>
          <Textarea
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter category description..."
            rows={4}
            disabled={loading || viewMode}
          />
        </div>

        <div>
          <FileUpload
            label="Category Image"
            onChange={(img) => setForm({ ...form, image: img })}
            maxFiles={1}
            disabled={loading || viewMode}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button
            disabled={loading || viewMode}
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={loading || viewMode} type="submit">
            {category ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
