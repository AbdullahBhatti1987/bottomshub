// // models/Brand.js
// import mongoose from 'mongoose';

// const brandSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     slug: { type: String, required: true, unique: true },
//     logo: { type: String }, // Optional logo image
//     active: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Brand || mongoose.model('Brand', brandSchema);

// models/Brand.js
import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: "",
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model("Brand", BrandSchema);

export default Brand;
