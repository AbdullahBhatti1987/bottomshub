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
      enum: ['flat', 'percentage', 'buy1get1'],
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
