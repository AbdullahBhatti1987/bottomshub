// models/CMSPage.js
import mongoose from 'mongoose';

const cmsPageSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, // HTML or markdown
    seoTitle: { type: String },
    seoDescription: { type: String },
    status: { type: String, enum: ['published', 'draft'], default: 'draft' },
  },
  { timestamps: true }
);

export default mongoose.models.CMSPage || mongoose.model('CMSPage', cmsPageSchema);
