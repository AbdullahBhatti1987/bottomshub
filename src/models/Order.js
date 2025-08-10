import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
  selectedSize: { type: String },
  priceAtPurchase: { type: Number, required: true }, // price at time of order
  name: { type: String, required: true },            // product name snapshot
  image: { type: String },                            // product image snapshot (URL)
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: v => Array.isArray(v) && v.length > 0,  // Ensure items array not empty
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, default: '' },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, default: 'Pakistan' },
      phone: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Stripe', 'EasyPaisa'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Coupon',
      default: null,
    },
    notes: {
      type: String,
      default: '',
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
