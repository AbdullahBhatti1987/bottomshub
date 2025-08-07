import mongoose from 'mongoose';

const notificationLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: String,
  message: String,
  meta: mongoose.Schema.Types.Mixed,
  read: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.NotificationLog || mongoose.model('NotificationLog', notificationLogSchema);
