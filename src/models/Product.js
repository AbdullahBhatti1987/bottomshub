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
    tags: {
      type: String, // single string instead of array
      enum: ["new arrival", "sale"], // only allow these two
      default: "new arrival", // ya "" agar default empty chahiye
    },

    sizes: {
      type: [String],
      enum: ["small", "medium", "large", "x-large", "xx-large"],
      default: [],
    },
    discount: {
      type: String,
      enum: ["flat", "percentage", "buy1get1"],
      default: "flat",
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
