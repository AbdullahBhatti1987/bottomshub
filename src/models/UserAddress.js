import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: String,
  phone: String,
  street: String,
  city: String,
  province: String,
  postalCode: String,
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.UserAddress || mongoose.model('UserAddress', addressSchema);
