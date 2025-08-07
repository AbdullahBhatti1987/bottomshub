import mongoose from 'mongoose';

const sellerPayoutSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // As you have single vendor system, seller is a User
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'paid'],
      default: 'pending',
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    processedAt: {
      type: Date,
    },
    notes: {
      type: String,
      default: '',
    },
    paymentMethod: {
      type: String,
      enum: ['Bank Transfer', 'EasyPaisa', 'Cash'],
      required: true,
      default: 'Bank Transfer',
    },
  },
  { timestamps: true }
);

export default mongoose.models.SellerPayout || mongoose.model('SellerPayout', sellerPayoutSchema);
