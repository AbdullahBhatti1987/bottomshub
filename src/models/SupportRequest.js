import mongoose from 'mongoose';

const supportRequestSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: 'open' }
}, { timestamps: true });

export default mongoose.models.SupportRequest || mongoose.model('SupportRequest', supportRequestSchema);
