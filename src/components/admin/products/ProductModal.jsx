// "use client";

// import { useState, useEffect } from "react";
// import Modal from "@/components/ui/Modal";
// import Input from "@/components/ui/Input";
// import Textarea from "@/components/ui/Textarea";
// import { Select, SelectItem } from "@/components/ui/Select"; // Assuming you're using your own custom Select
// import Button from "@/components/ui/Button";
// import FileUpload from "@/components/ui/FileUpload";
// import Image from "next/image";

// export default function ProductModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   categories = [],
//   product = null,
// }) {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     price: "",
//     category: "",
//     images: [],
//   });

//   useEffect(() => {
//     if (product) {
//       setForm({
//         title: product.title || "",
//         description: product.description || "",
//         price: product.price || "",
//         category: product.category || "",
//         images: product?.images || [],
//       });
//     } else {
//       setForm({
//         title: "",
//         description: "",
//         price: "",
//         category: "",
//         images: [],
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleImageUpload = (url) => {
//     setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
//   };

//   const handleRemoveImage = (index) => {
//     const updated = [...form.images];
//     updated.splice(index, 1);
//     setForm({ ...form, images: updated });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={product ? "Edit Product" : "Add New Product"}
//     >
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="text-sm font-medium text-gray-700">Title</label>
//           <Input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Description
//           </label>
//           <Textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700">
//             Price (PKR)
//           </label>
//           <Input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             onBlur={(e) => {
//               const value = parseFloat(e.target.value);
//               const formatted = isNaN(value) ? "" : value.toFixed(2);
//               handleChange({ target: { name: "price", value: formatted } });
//             }}
//             required
//             min={0}
//             step="0.01"
//           />
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700">Category</label>
//           <Select
//             name="category"
//             value={form.category}
//             onChange={(value) => setForm({ ...form, category: value })}
//             required
//           >
//             <SelectItem value="" disabled>
//               Select Category
//             </SelectItem>
//             {categories.map((cat) => (
//               <SelectItem key={cat._id} value={cat._id}>
//                 {cat.name}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <label className="text-sm font-medium text-gray-700">Image</label>
//           <FileUpload
//             label="Upload product images"
//             onUploaded={(uploadedImages) => {
//               setForm((prev) => ({
//                 ...prev,
//                 images: uploadedImages,
//               }));
//             }}
//             accept="image/*"
//             multiple={true}
//             preview={true}
//             maxFiles={5}
//           />

//           {form.images.length > 0 && (
//             <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 overflow-visible">
//               <div
//                 key={idx}
//                 className="relative group w-full aspect-square border rounded overflow-visible"
//               >
//                 <Image
//                   src={img}
//                   alt={`Image ${idx}`}
//                   className="w-full h-full object-cover"
//                   width={100}
//                   height={100}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveImage(idx)}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-bl px-1 text-xs z-10"
//                 >
//                   ✕
//                 </button>

//                 {/* Tooltip / Chit */}
//                 <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded z-50 opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">
//                   Image Preview
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end gap-2 pt-4">
//           <Button type="button" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button type="submit">{product ? "Update" : "Create"}</Button>
//         </div>
//       </form>
//     </Modal>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Select, SelectItem } from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import FileUpload from "@/components/ui/FileUpload";
import Image from "next/image";
import Checkbox from "@/components/ui/Checkbox";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  categories = [],
  product = null,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    tags: [],
    sizes: [],
    discount: "flat",
    images: [],
    inStock: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (product) {
      // Edit mode
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        category: product.category?._id || product.category || "",
        tags: product.tags || [],
        sizes: product.sizes || [],
        discount: product.discount || "",
        images: product.images || [],
        inStock: product.inStock ?? true,
        isFeatured: product.isFeatured ?? false,
      });
    } else {
      // Add mode
      setForm({
        name: "",
        slug: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "",
        tags: [],
        sizes: [],
        discount: "[]",
        images: [],
        inStock: true,
        isFeatured: false,
      });
    }
  }, [product, isOpen]);

  useEffect(() => {
    if (form.name && !product) {
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

  const handleSelectChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = (urls) => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...urls].slice(0, 5),
    }));
  };

  const handleRemoveImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <Input
            label="Product Name"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="text-sm font-medium text-gray-700">Slug</label>
          <Input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          {/* <label className="text-sm font-medium text-gray-700">
            Price (PKR)
          </label> */}
          <Input
            label="Price"
            type="number"
            name="price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            min="0"
            step="0.01"
          />
        </div>

        {/* Original Price */}
        <div>
          {/* <label className="text-sm font-medium text-gray-700">
            Original Price (PKR)
          </label> */}
          <Input
            label="Original Price"
            type="number"
            name="originalPrice"
            value={form.originalPrice}
            onChange={handleChange}
            min={0}
            step="0.01"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Select
            name="category"
            value={form.category}
            onChange={(value) => handleSelectChange("category", value)}
            required
          >
            <SelectItem value="" disabled>
              Select Category
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm font-medium text-gray-700">Tags</label>
          <Select
            multiple
            value={form.tags}
            onChange={(value) => handleSelectChange("tags", value)}
          >
            <SelectItem value="new arrival">New Arrival</SelectItem>
            <SelectItem value="sale">Sale</SelectItem>
          </Select>
        </div>

        {/* Sizes */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Sizes
          </label>
          <div className="flex flex-wrap gap-4">
            {["Small", "Medium", "Large", "X-Large", "XX-Large"].map((size) => (
              <Checkbox
                key={size}
                label={size}
                value={size.toLowerCase()}
                checked={form.sizes.includes(size.toLowerCase())}
                onChange={(val, isChecked) => {
                  if (isChecked) {
                    setForm((prev) => ({
                      ...prev,
                      sizes: [...prev.sizes, val],
                    }));
                  } else {
                    setForm((prev) => ({
                      ...prev,
                      sizes: prev.sizes.filter((s) => s !== val),
                    }));
                  }
                }}
              />
            ))}
          </div>
        </div>

        {/* Discount Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Discount Type
          </label>
          <div className="flex flex-wrap gap-4">
            {["flat", "percentage", "buy1get1"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer capitalize"
              >
                <input
                  type="radio"
                  name="discountType"
                  value={type}
                  checked={form.discount === type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, discount: e.target.value }))
                  }
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Stock & Featured */}
        <div className="flex gap-6">
          <Checkbox
            label="In Stock"
            value="inStock"
            checked={form.inStock}
            onChange={(_, isChecked) =>
              setForm({ ...form, inStock: isChecked })
            }
          />
          <Checkbox
            label="Featured"
            value="isFeatured"
            checked={form.isFeatured}
            onChange={(_, isChecked) =>
              setForm({ ...form, isFeatured: isChecked })
            }
          />
        </div>

        {/* Images */}
        <div>
          <label className="text-sm font-medium text-gray-700">Images</label>
          {/* <FileUpload
            label="Upload product images"
            onUploaded={handleImageUpload}
            accept="image/*"
            multiple={true}
            preview={true}
            maxFiles={5}
          /> */}

          <FileUpload
            label="Upload product images"
            onChange={(newImages) => {
              console.log("📸 Selected images:", newImages);
              handleImageUpload(newImages);
            }}
            accept="image/*"
            multiple={true}
            preview={true}
            maxFiles={5}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{product ? "Update" : "Create"}</Button>
        </div>
      </form>
    </Modal>
  );
}
