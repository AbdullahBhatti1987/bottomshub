import mongoose from 'mongoose';

const platformSettingsSchema = new mongoose.Schema(
  {
    platformName: {
      type: String,
      default: 'BottomsHub',
    },
    supportEmail: {
      type: String,
      default: '',
    },
    supportPhone: {
      type: String,
      default: '',
    },
    currency: {
      type: String,
      default: 'PKR',
    },
    codEnabled: {
      type: Boolean,
      default: true,
    },
    defaultReturnPolicy: {
      type: String,
      default: 'You can return products within 7 days of purchase.',
    },
    defaultAbout: {
      type: String,
      default: 'Welcome to our store.',
    },
    logo: {
      type: String,
      default: '',
    },
    favicon: {
      type: String,
      default: '',
    },
    whatsappNumber: {
      type: String,
      default: '',
    },
    maintenanceMode: {
      type: Boolean,
      default: false,
    },
    defaultSeoTitle: {
      type: String,
      default: 'BottomsHub - Your Fashion Destination',
    },
    defaultSeoDescription: {
      type: String,
      default: 'Shop the latest women’s suits, denim, and accessories online in Pakistan.',
    },
    facebook: {
      type: String,
      default: '',
    },
    instagram: {
      type: String,
      default: '',
    },
    tiktok: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.models.PlatformSettings || mongoose.model('PlatformSettings', platformSettingsSchema);
