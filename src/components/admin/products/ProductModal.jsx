// // "use client";

// // import { useState, useEffect } from "react";
// // import Modal from "@/components/ui/Modal";
// // import Input from "@/components/ui/Input";
// // import Textarea from "@/components/ui/Textarea";
// // import { Select, SelectItem } from "@/components/ui/Select";
// // import Button from "@/components/ui/Button";
// // import FileUpload from "@/components/ui/FileUpload";
// // import Checkbox from "@/components/ui/Checkbox";
// // import Loader from "@/components/ui/Loader";

// // export default function ProductModal({
// //   isOpen,
// //   onClose,
// //   onSubmit,
// //   loading,
// //   viewMode,
// //   categories = [],
// //   product = null,
// // }) {
// //   const [form, setForm] = useState({
// //     name: "",
// //     slug: "",
// //     description: "",
// //     price: "",
// //     originalPrice: "",
// //     category: "",
// //     tags: "",
// //     sizes: [],
// //     discount: "flat",
// //     images: [],
// //     inStock: true,
// //     isFeatured: false,
// //   });

// //   useEffect(() => {
// //     if (product) {
// //       // Edit mode
// //       setForm({
// //         name: product.name || "",
// //         slug: product.slug || "",
// //         description: product.description || "",
// //         price: product.price || "",
// //         originalPrice: product.originalPrice || "",
// //         category: product.category?._id || product.category || "",
// //         // Ensure tag is string (take first if array)
// //         tags: Array.isArray(product.tags)
// //           ? product.tags[0]
// //           : product.tags || "",
// //         sizes: product.sizes || [],
// //         discount: product.discount || "",
// //         images: product.images || [],
// //         inStock: product.inStock ?? true,
// //         isFeatured: product.isFeatured ?? false,
// //       });
// //     } else {
// //       // Add mode
// //       setForm({
// //         name: "",
// //         slug: "",
// //         description: "",
// //         price: "",
// //         originalPrice: "",
// //         category: "",
// //         tags: [],
// //         sizes: [],
// //         discount: "[]",
// //         images: [],
// //         inStock: true,
// //         isFeatured: false,
// //       });
// //     }
// //   }, [product, isOpen]);

// //   useEffect(() => {
// //     if (form.name && !product) {
// //       const slug = form.name
// //         .toLowerCase()
// //         .replace(/[^a-z0-9]+/g, "-")
// //         .replace(/^-+|-+$/g, "");
// //       setForm((prev) => ({ ...prev, slug }));
// //     }
// //   }, [form.name]);

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value });
// //   };

// //   const handleSelectChange = (name, value) => {
// //     setForm({ ...form, [name]: value });
// //   };

// //   const handleImageUpload = (urls) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       images: [...prev.images, ...urls].slice(0, 5),
// //     }));
// //   };

// //   const handleRemoveImage = (index) => {
// //     setForm((prev) => ({
// //       ...prev,
// //       images: prev.images.filter((_, i) => i !== index),
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     onSubmit(form);
// //   };

// //   return (
// //     <Modal
// //       isOpen={isOpen}
// //       onClose={onClose}
// //       title={
// //         viewMode ? "View Product" : product ? "Edit Product" : "Add New Product"
// //       }
// //     >
// //       <form onSubmit={handleSubmit} className="space-y-4">
// //         {/* Name */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">Name</label>
// //           <Input
// //             label="Product Name"
// //             name="name"
// //             value={form.name}
// //             disabled={loading || viewMode}
// //             onChange={(e) => setForm({ ...form, name: e.target.value })}
// //             required
// //           />
// //         </div>

// //         {/* Slug */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">Slug</label>
// //           <Input
// //             name="slug"
// //             value={form.slug}
// //             disabled={loading || viewMode}
// //             onChange={handleChange}
// //             required
// //           />
// //         </div>

// //         {/* Description */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">
// //             Description
// //           </label>
// //           <Textarea
// //             name="description"
// //             value={form.description}
// //             disabled={loading || viewMode}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         {/* Price */}
// //         <div>
// //           {/* <label className="text-sm font-medium text-gray-700">
// //             Price (PKR)
// //           </label> */}
// //           <Input
// //             label="Price"
// //             type="number"
// //             name="price"
// //             value={form.price}
// //             disabled={loading || viewMode}
// //             onChange={(e) => setForm({ ...form, price: e.target.value })}
// //             min="0"
// //             step="0.01"
// //           />
// //         </div>

// //         {/* Original Price */}
// //         <div>
// //           {/* <label className="text-sm font-medium text-gray-700">
// //             Original Price (PKR)
// //           </label> */}
// //           <Input
// //             label="Original Price"
// //             type="number"
// //             name="originalPrice"
// //             value={form.originalPrice}
// //             disabled={loading || viewMode}
// //             onChange={handleChange}
// //             min={0}
// //             step="0.01"
// //           />
// //         </div>

// //         {/* Category */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">Category</label>
// //           <Select
// //             name="category"
// //             value={form.category}
// //             disabled={loading || viewMode}
// //             onChange={(value) => handleSelectChange("category", value)}
// //             required
// //           >
// //             <SelectItem value="" disabled>
// //               Select Category
// //             </SelectItem>
// //             {categories.map((cat) => (
// //               <SelectItem key={cat._id} value={cat._id}>
// //                 {cat.name}
// //               </SelectItem>
// //             ))}
// //           </Select>
// //         </div>

// //         {/* Tags */}
// //         {/* Tags */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">Tag</label>
// //           {viewMode ? (
// //             <p className="p-2 border rounded capitalize">
// //               {form.tags}
// //             </p>
// //           ) : (
// //             <Select
// //               value={form.tags || ""}
// //               disabled={loading}
// //               onChange={(value) =>
// //                 setForm((prev) => ({ ...prev, tags: value }))
// //               }
// //               required
// //             >
// //               <SelectItem value="new arrival">New Arrival</SelectItem>
// //               <SelectItem value="sale">Sale</SelectItem>
// //             </Select>
// //           )}
// //         </div>

// //         {/* Sizes */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700 mb-2 block">
// //             Sizes
// //           </label>
// //           <div className="flex flex-wrap gap-4">
// //             {["Small", "Medium", "Large", "X-Large", "XX-Large"].map((size) => (
// //               <Checkbox
// //                 key={size}
// //                 label={size}
// //                 disabled={loading || viewMode}
// //                 value={size.toLowerCase()}
// //                 checked={form.sizes.includes(size.toLowerCase())}
// //                 onChange={(val, isChecked) => {
// //                   if (isChecked) {
// //                     setForm((prev) => ({
// //                       ...prev,
// //                       sizes: [...prev.sizes, val],
// //                     }));
// //                   } else {
// //                     setForm((prev) => ({
// //                       ...prev,
// //                       sizes: prev.sizes.filter((s) => s !== val),
// //                     }));
// //                   }
// //                 }}
// //               />
// //             ))}
// //           </div>
// //         </div>

// //         {/* Discount Type */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700 mb-2 block">
// //             Discount Type
// //           </label>
// //           <div className="flex flex-wrap gap-4">
// //             {["flat", "percentage", "buy1get1"].map((type) => (
// //               <label
// //                 key={type}
// //                 className={`flex items-center gap-2 cursor-pointer capitalize ${
// //                   loading || viewMode
// //                     ? "opacity-50 cursor-not-allowed pointer-events-none"
// //                     : ""
// //                 }`}
// //               >
// //                 <input
// //                   type="radio"
// //                   name="discountType"
// //                   value={type}
// //                   disabled={loading || viewMode}
// //                   checked={form.discount === type}
// //                   onChange={(e) =>
// //                     setForm((prev) => ({ ...prev, discount: e.target.value }))
// //                   }
// //                 />
// //                 {type}
// //               </label>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Stock & Featured */}
// //         <div className="flex gap-6">
// //           <Checkbox
// //             label="In Stock"
// //             value="inStock"
// //             checked={form.inStock}
// //             onChange={(_, isChecked) =>
// //               setForm({ ...form, inStock: isChecked })
// //             }
// //             disabled={loading || viewMode}
// //           />
// //           <Checkbox
// //             label="Featured"
// //             value="isFeatured"
// //             checked={form.isFeatured}
// //             onChange={(_, isChecked) =>
// //               setForm({ ...form, isFeatured: isChecked })
// //             }
// //             disabled={loading || viewMode}
// //           />
// //         </div>

// //         {/* Images */}
// //         <div>
// //           <label className="text-sm font-medium text-gray-700">Images</label>
// //           {/* <FileUpload
// //             label="Upload product images"
// //             onUploaded={handleImageUpload}
// //             accept="image/*"
// //             multiple={true}
// //             preview={true}
// //             maxFiles={5}
// //           /> */}

// //           <FileUpload
// //             label="Upload product images"
// //             onChange={(newImages) => {
// //               console.log("📸 Selected images:", newImages);
// //               handleImageUpload(newImages);
// //             }}
// //             accept="image/*"
// //             multiple={true}
// //             preview={true}
// //             maxFiles={5}
// //             disabled={loading || viewMode}
// //           />
// //         </div>

// //         {/* Actions */}
// //         <div className="flex justify-end gap-2 pt-4">
// //           <Button
// //             type="button"
// //             onClick={onClose}
// //             disabled={loading || viewMode}
// //           >
// //             Cancel
// //           </Button>
// //           <Button type="submit" disabled={loading || viewMode}>
// //             {product ? "Update" : "Create"}
// //           </Button>
// //         </div>
// //       </form>
// //       {loading && <Loader />}
// //     </Modal>
// //   );
// // }

// "use client";

// import { useState, useEffect } from "react";
// import Modal from "@/components/ui/Modal";
// import Input from "@/components/ui/Input";
// import Textarea from "@/components/ui/Textarea";
// import { Select, SelectItem } from "@/components/ui/Select";
// import Button from "@/components/ui/Button";
// import FileUpload from "@/components/ui/FileUpload";
// import Checkbox from "@/components/ui/Checkbox";
// import Loader from "@/components/ui/Loader";

// export default function ProductModal({
//   isOpen,
//   onClose,
//   onSubmit,
//   loading,
//   viewMode,
//   categories = [],
//   product = null,
// }) {
//   // Add these inside your initial form state
//   const [form, setForm] = useState({
//     name: "",
//     slug: "",
//     description: "",
//     shortDescription: "",
//     sku: "",
//     price: "",
//     originalPrice: "",
//     quantity: 0,
//     discountValue: 0,
//     category: "",
//     tags: "",
//     sizes: [],
//     discount: "flat",
//     images: [],
//     inStock: true,
//     isFeatured: false,
//   });

//   useEffect(() => {
//     if (product) {
//       setForm({
//         name: product.name || "",
//         slug: product.slug || "",
//         description: product.description || "",
//         shortDescription: product.shortDescription || "",
//         sku: product.sku || "",
//         price: product.price || "",
//         originalPrice: product.originalPrice || "",
//         quantity: product.quantity || 0,
//         discountValue: product.discountValue || 0,
//         category: product.category?._id || product.category || "",
//         tags: Array.isArray(product.tags)
//           ? product.tags[0]
//           : product.tags || "",
//         sizes: product.sizes || [],
//         discount: product.discount || "flat",
//         images: product.images || [],
//         inStock: product.inStock ?? true,
//         isFeatured: product.isFeatured ?? false,
//       });
//     } else {
//       setForm({
//         name: "",
//         slug: "",
//         description: "",
//         shortDescription: "",
//         sku: "",
//         price: "",
//         originalPrice: "",
//         quantity: 0,
//         discountValue: 0,
//         category: "",
//         tags: "",
//         sizes: [],
//         discount: "flat",
//         images: [],
//         inStock: true,
//         isFeatured: false,
//       });
//     }
//   }, [product, isOpen]);

//   useEffect(() => {
//     if (form.name && !product) {
//       const slug = form.name
//         .toLowerCase()
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/^-+|-+$/g, "");
//       setForm((prev) => ({ ...prev, slug }));
//     }
//   }, [form.name]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSelectChange = (name, value) => {
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageUpload = (urls) => {
//     setForm((prev) => ({
//       ...prev,
//       images: [...prev.images, ...urls].slice(0, 5),
//     }));
//   };

//   const handleRemoveImage = (index) => {
//     setForm((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(form);
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title={
//         viewMode ? "View Product" : product ? "Edit Product" : "Add New Product"
//       }
//     >
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <div>
//           <Input
//             label="Product Name"
//             name="name"
//             value={form.name}
//             disabled={loading || viewMode}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//         </div>

//         {/* Slug */}
//         <div>
//           <Input
//            label="Slug"
//             name="slug"
//             value={form.slug}
//             disabled={loading || viewMode}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         {/* SKU */}
//         <div>
//           <Input
//            label="SKU"
//             name="sku"
//             value={form.sku}
//             onChange={handleChange}
//             disabled={loading || viewMode}
//             required
//           />
//         </div>

//         {/* Short Description */}
//         <div>
       
//           <Textarea
//            label="Short Description"
//             name="shortDescription"
//             value={form.shortDescription}
//             onChange={handleChange}
//             disabled={loading || viewMode}
//             rows={2}
//             placeholder="Enter a short description..."
//           />
//         </div>

//         {/* Quantity */}
//         <div>
//           <Input
//            label="Quantity"
//             name="quantity"
//             type="number"
//             value={form.quantity}
//             onChange={handleChange}
//             min={0}
//             disabled={loading || viewMode}
//           />
//         </div>

//         {/* Discount Value */}
//         <div>
     
//           <Input
//           label="Discount Value"
//             name="discountValue"
//             type="number"
//             value={form.discountValue}
//             onChange={handleChange}
//             min={0}
//             step="0.01"
//             disabled={loading || viewMode}
//           />
//         </div>

//         {/* Description */}
//         <div>
       
//           <Textarea
//           label="Description"
//             name="description"
//             value={form.description}
//             disabled={loading || viewMode}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Price */}
//         <div>
          
//           <Input
//             label="Price"
//             type="number"
//             name="price"
//             value={form.price}
//             disabled={loading || viewMode}
//             onChange={(e) => setForm({ ...form, price: e.target.value })}
//             min="0"
//             step="0.01"
//           />
//         </div>

//         {/* Original Price */}
//         <div>
         
//           <Input
//             label="Original Price"
//             type="number"
//             name="originalPrice"
//             value={form.originalPrice}
//             disabled={loading || viewMode}
//             onChange={handleChange}
//             min={0}
//             step="0.01"
//           />
//         </div>

//         {/* Category */}
//         <div>
         
//           <Select
//            label="Category"
//             name="category"
//             value={form.category}
//             disabled={loading || viewMode}
//             onChange={(value) => handleSelectChange("category", value)}
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

//         {/* Tags */}
//         {/* Tags */}
//         <div>
//           <label className="text-sm font-medium text-gray-700 mb-4 ">Tag</label>
//           {viewMode ? (
//             <p className="p-2 border rounded capitalize">{form.tags}</p>
//           ) : (
//             <Select
//               value={form.tags || ""}
//               disabled={loading}
//               onChange={(value) =>
//                 setForm((prev) => ({ ...prev, tags: value }))
//               }
//               required
//             >
//               <SelectItem value="new arrival">New Arrival</SelectItem>
//               <SelectItem value="sale">Sale</SelectItem>
//             </Select>
//           )}
//         </div>

//         {/* Sizes */}
//         <div>
//           <label className="text-sm font-medium text-gray-700 mb-2 block">
//             Sizes
//           </label>
//           <div className="flex flex-wrap gap-4">
//             {["Small", "Medium", "Large", "X-Large", "XX-Large"].map((size) => (
//               <Checkbox
//                 key={size}
//                 label={size}
//                 disabled={loading || viewMode}
//                 value={size.toLowerCase()}
//                 checked={form.sizes.includes(size.toLowerCase())}
//                 onChange={(val, isChecked) => {
//                   if (isChecked) {
//                     setForm((prev) => ({
//                       ...prev,
//                       sizes: [...prev.sizes, val],
//                     }));
//                   } else {
//                     setForm((prev) => ({
//                       ...prev,
//                       sizes: prev.sizes.filter((s) => s !== val),
//                     }));
//                   }
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Discount Type */}
//         <div>
//           <label className="text-sm font-medium text-gray-700 mb-2 block">
//             Discount Type
//           </label>
//           <div className="flex flex-wrap gap-4">
//             {["flat", "percentage", "buy1get1"].map((type) => (
//               <label
//                 key={type}
//                 className={`flex items-center gap-2 cursor-pointer capitalize ${
//                   loading || viewMode
//                     ? "opacity-50 cursor-not-allowed pointer-events-none"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="discountType"
//                   value={type}
//                   disabled={loading || viewMode}
//                   checked={form.discount === type}
//                   onChange={(e) =>
//                     setForm((prev) => ({ ...prev, discount: e.target.value }))
//                   }
//                 />
//                 {type}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Stock & Featured */}
//         <div className="flex gap-6">
//           <Checkbox
//             label="In Stock"
//             value="inStock"
//             checked={form.inStock}
//             onChange={(_, isChecked) =>
//               setForm({ ...form, inStock: isChecked })
//             }
//             disabled={loading || viewMode}
//           />
//           <Checkbox
//             label="Featured"
//             value="isFeatured"
//             checked={form.isFeatured}
//             onChange={(_, isChecked) =>
//               setForm({ ...form, isFeatured: isChecked })
//             }
//             disabled={loading || viewMode}
//           />
//         </div>

//         {/* Images */}
//         <div>
//           <label className="text-sm font-medium text-gray-700">Images</label>
//           {/* <FileUpload
//             label="Upload product images"
//             onUploaded={handleImageUpload}
//             accept="image/*"
//             multiple={true}
//             preview={true}
//             maxFiles={5}
//           /> */}

//           <FileUpload
//             label="Upload product images"
//             onChange={(newImages) => {
//               console.log("📸 Selected images:", newImages);
//               handleImageUpload(newImages);
//             }}
//             accept="image/*"
//             multiple={true}
//             preview={true}
//             maxFiles={5}
//             disabled={loading || viewMode}
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-2 pt-4">
//           <Button
//             type="button"
//             onClick={onClose}
//             disabled={loading || viewMode}
//           >
//             Cancel
//           </Button>
//           <Button type="submit" disabled={loading || viewMode}>
//             {product ? "Update" : "Create"}
//           </Button>
//         </div>
//       </form>
//       {loading && <Loader />}
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
import Checkbox from "@/components/ui/Checkbox";
import Loader from "@/components/ui/Loader";

export default function ProductModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  viewMode,
  categories = [],
  product = null,
}) {
  const sizeOptions = ["small", "medium", "large", "x-large", "xx-large"];

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    sku: "",
    price: "",
    originalPrice: "",
    category: "",
    tags: "",
    sizes: [], // array of {size, quantity}
    discountApplied: false,
    discount: { type: "flat", value: 0 },
    images: [],
    inStock: true,
    isFeatured: false,
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        slug: product.slug || "",
        description: product.description || "",
        shortDescription: product.shortDescription || "",
        sku: product.sku || "",
        price: product.price || "",
        originalPrice: product.originalPrice || "",
        category: product.category?._id || product.category || "",
        tags: Array.isArray(product.tags) ? product.tags[0] : product.tags || "",
        sizes: product.sizes || [],
        discountApplied: product.discountApplied || false,
        discount: product.discount || { type: "flat", value: 0 },
        images: product.images || [],
        inStock: product.inStock ?? true,
        isFeatured: product.isFeatured ?? false,
      });
    } else {
      setForm({
        name: "",
        slug: "",
        description: "",
        shortDescription: "",
        sku: "",
        price: "",
        originalPrice: "",
        category: "",
        tags: "",
        sizes: [],
        discountApplied: false,
        discount: { type: "percentage", value: 0 },
        images: [],
        inStock: true,
        isFeatured: false,
      });
    }
  }, [product, isOpen]);

  // Auto generate slug from name
  useEffect(() => {
    if (form.name && !product) {
      const slug = form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setForm((prev) => ({ ...prev, slug }));
    }
  }, [form.name]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSelectChange = (name, value) => setForm({ ...form, [name]: value });

  const handleImageUpload = (urls) =>
    setForm((prev) => ({ ...prev, images: [...prev.images, ...urls].slice(0, 5) }));

  const handleRemoveImage = (index) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const handleSizeToggle = (size) => {
    const exists = form.sizes.find((s) => s.size === size);
    if (exists) {
      setForm((prev) => ({ ...prev, sizes: prev.sizes.filter((s) => s.size !== size) }));
    } else {
      setForm((prev) => ({ ...prev, sizes: [...prev.sizes, { size, quantity: 0 }] }));
    }
  };

  const handleSizeQuantityChange = (size, value) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) => (s.size === size ? { ...s, quantity: Number(value) } : s)),
    }));
  };

  const handleDiscountAppliedChange = (checked) => {
    setForm((prev) => ({ ...prev, discountApplied: checked }));
    if (!checked) setForm((prev) => ({ ...prev, discount: { type: "flat", value: 0 } }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={viewMode ? "View Product" : product ? "Edit Product" : "Add New Product"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name, Slug, SKU, Price, Original Price, Short Description, Description */}
        <Input label="Product Name" name="name" value={form.name} disabled={loading || viewMode} onChange={handleChange} required />
        <Input label="Slug" name="slug" value={form.slug} disabled={loading || viewMode} onChange={handleChange} required />
        <Input label="SKU" name="sku" value={form.sku} disabled={loading || viewMode} onChange={handleChange} required />
        <Input label="Price" type="number" name="price" value={form.price} disabled={loading || viewMode} onChange={handleChange} required />
        <Input label="Original Price" type="number" name="originalPrice" value={form.originalPrice} disabled={loading || viewMode} onChange={handleChange} />
        <Textarea label="Short Description" name="shortDescription" value={form.shortDescription} disabled={loading || viewMode} onChange={handleChange} rows={2} />
        <Textarea label="Description" name="description" value={form.description} disabled={loading || viewMode} onChange={handleChange} />

        {/* Category */}
        <Select label="Category" value={form.category} disabled={loading || viewMode} onChange={(val) => handleSelectChange("category", val)} required>
          <SelectItem value="" disabled>Select Category</SelectItem>
          {categories.map((cat) => <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>)}
        </Select>

        {/* Tags */}
        <Select label="Tag" value={form.tags} disabled={loading || viewMode} onChange={(val) => setForm((prev) => ({ ...prev, tags: val }))}>
          <SelectItem value="new arrival">New Arrival</SelectItem>
          <SelectItem value="sale">Sale</SelectItem>
        </Select>

        {/* Sizes */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Sizes</label>
          <div className="flex flex-wrap gap-4">
            {sizeOptions.map((size) => {
              const selected = form.sizes.find((s) => s.size === size);
              return (
                <div key={size} className="flex items-center gap-2">
                  <Checkbox
                    label={size.charAt(0).toUpperCase() + size.slice(1)}
                    value={size}
                    checked={!!selected}
                    disabled={loading || viewMode}
                    onChange={() => handleSizeToggle(size)}
                  />
                  {selected && (
                    <Input
                      type="number"
                      min={0}
                      value={selected.quantity}
                      onChange={(e) => handleSizeQuantityChange(size, e.target.value)}
                      disabled={loading || viewMode}
                      className="w-20"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Discount */}
        <div>
          <Checkbox
            label="Apply Discount"
            checked={form.discountApplied}
            disabled={loading || viewMode}
            onChange={(_, isChecked) => handleDiscountAppliedChange(isChecked)}
          />
          {form.discountApplied && (
            <div className="flex gap-4 mt-2 items-center">
              {["flat", "percentage", "buy1get1"].map((type) => (
                <label key={type} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="discountType"
                    value={type}
                    checked={form.discount.type === type}
                    onChange={() => setForm((prev) => ({ ...prev, discount: { ...prev.discount, type } }))}
                    disabled={loading || viewMode}
                  />
                  {type}
                </label>
              ))}
              <Input
                type="number"
                min={0}
                value={form.discount.value}
                onChange={(e) => setForm((prev) => ({ ...prev, discount: { ...prev.discount, value: Number(e.target.value) } }))}
                disabled={loading || viewMode}
                className="w-24"
              />
            </div>
          )}
        </div>

        {/* Stock & Featured */}
        <div className="flex gap-6">
          <Checkbox label="In Stock" checked={form.inStock} onChange={(_, checked) => setForm((prev) => ({ ...prev, inStock: checked }))} disabled={loading || viewMode} />
          <Checkbox label="Featured" checked={form.isFeatured} onChange={(_, checked) => setForm((prev) => ({ ...prev, isFeatured: checked }))} disabled={loading || viewMode} />
        </div>

        {/* Images */}
        <FileUpload
          label="Upload product images"
          onChange={(newImages) => handleImageUpload(newImages)}
          accept="image/*"
          multiple
          preview
          maxFiles={5}
          disabled={loading || viewMode}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" onClick={onClose} disabled={loading || viewMode}>Cancel</Button>
          <Button type="submit" disabled={loading || viewMode}>{product ? "Update" : "Create"}</Button>
        </div>
      </form>
      {loading && <Loader />}
    </Modal>
  );
}
