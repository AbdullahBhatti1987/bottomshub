import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  query: String,
  filters: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.models.SearchHistory || mongoose.model('SearchHistory', searchHistorySchema);
