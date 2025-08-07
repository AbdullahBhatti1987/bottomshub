import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    discountType: {
      type: String,
      enum: ['flat', 'percentage'],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    minCartValue: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
    },
    usageLimit: {
      type: Number,
      default: null, // unlimited if null
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);



// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, default: 1 },
// });

// const cartSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
//     items: [cartItemSchema],
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);


// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   product: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product',
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: 1,
//     default: 1,
//   },
//   selectedSize: {
//     type: String, // optional, if your products support sizes
//   },
// });

// const cartSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//       required: false, // null for guest carts
//     },
//     items: [cartItemSchema],
//     coupon: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Coupon',
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
