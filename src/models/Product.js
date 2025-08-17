// // // import mongoose from "mongoose";

// // // const productSchema = new mongoose.Schema(
// // //   {
// // //     name: { type: String, required: true },
// // //     slug: { type: String, required: true, unique: true },
// // //     description: { type: String, default: "" },
// // //     price: { type: Number, required: true },
// // //     originalPrice: { type: Number, default: 0 },
// // //     category: {
// // //       type: mongoose.Schema.Types.ObjectId,
// // //       ref: "Category",
// // //       required: true,
// // //     },
// // //     sku: { type: String, required: true, unique: true },
// // //     quantity: { type: Number, default: 0 },
// // //     discountValue: { type: Number, default: 0 },
// // //     shortDescription: { type: String, default: "" },

// // //     sizes: {
// // //       type: [String],
// // //       enum: ["small", "medium", "large", "x-large", "xx-large"],
// // //       default: [],
// // //     },
// // //     discount: {
// // //       type: String,
// // //       enum: ["flat", "percentage", "buy1get1"],
// // //       default: "flat",
// // //     },

// // //     images: [
// // //       {
// // //         url: { type: String, required: true },
// // //         thumbnailUrl: { type: String, required: true },
// // //       },
// // //     ],

// // //     inStock: { type: Boolean, default: true },
// // //     isFeatured: { type: Boolean, default: false },
// // //   },
// // //   { timestamps: true }
// // // );

// // // export default mongoose.models.Product ||
// // //   mongoose.model("Product", productSchema);

// // import mongoose from "mongoose";

// // const productSchema = new mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     slug: { type: String, required: true, unique: true },
// //     description: { type: String, default: "" },
// //     price: { type: Number, required: true },
// //     originalPrice: { type: Number, default: 0 },
// //     category: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Category",
// //       required: true,
// //     },
// //     sku: { type: String, required: true, unique: true },
// //     quantity: { type: Number, default: 0 },
// //     discountValue: { type: Number, default: 0 },
// //     shortDescription: { type: String, default: "" },

// //     sizes: {
// //       type: [String],
// //       enum: ["small", "medium", "large", "x-large", "xx-large"],
// //       default: [],
// //     },
// //     discount: {
// //       type: String,
// //       enum: ["flat", "percentage", "buy1get1"],
// //       default: "flat",
// //     },

// //     images: [
// //       {
// //         url: { type: String, required: true },
// //         thumbnailUrl: { type: String, required: true },
// //       },
// //     ],

// //     inStock: { type: Boolean, default: true },
// //     isFeatured: { type: Boolean, default: false },
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.models.Product ||
// //   mongoose.model("Product", productSchema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     slug: { type: String, required: true, unique: true },
//     description: { type: String, default: "" },
//     price: { type: Number, required: true },
//     originalPrice: { type: Number, default: 0 },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     sku: { type: String, required: true, unique: true },
//     discountValue: { type: Number, default: 0 },
//     shortDescription: { type: String, default: "" },

//     // ✅ Updated sizes field with quantity
//     sizes: [
//       {
//         size: {
//           type: String,
//           enum: ["small", "medium", "large", "x-large", "xx-large"],
//           required: true,
//         },
//         quantity: { type: Number, default: 0 }, // per size stock
//       },
//     ],

//     discountApplied: { type: Boolean, default: false }, // yes/no

//     discount: {
//       type: {
//         type: String,
//         enum: ["flat", "percentage", "buy1get1"],
//       },
//       value: { type: Number },
//     },

//     images: [
//       {
//         url: { type: String, required: true },
//         thumbnailUrl: { type: String, required: true },
//       },
//     ],

//     inStock: { type: Boolean, default: true },
//     isFeatured: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Product ||
//   mongoose.model("Product", productSchema);

// Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    sku: { type: String, required: true, unique: true },
    shortDescription: { type: String, default: "" },

    // ✅ Correct sizes structure
    sizes: [
      {
        size: {
          type: String,
          enum: ["small", "medium", "large", "x-large", "xx-large"],
          required: true,
        },
        quantity: { type: Number, default: 0 },
      },
    ],

    discountApplied: { type: Boolean, default: false },

    // ✅ Correct discount structure
    discount: {
      type: {
        type: String,
        enum: ["flat", "percentage", "buy1get1"],
      },
      value: { type: Number },
    },
 tags: {
  type: String,
  required: true,
},

    images: [
      {
        url: { type: String, required: true },
        thumbnailUrl: { type: String, required: true },
      },
    ],

    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
