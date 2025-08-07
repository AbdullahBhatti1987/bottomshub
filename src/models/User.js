// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
    },
    address: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite error in dev
export default mongoose.models.User || mongoose.model('User', userSchema);
