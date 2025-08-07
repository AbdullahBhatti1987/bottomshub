// import mongoose from 'mongoose';

// const sellerSettingsSchema = new mongoose.Schema(
//   {
//     seller: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Seller',
//       required: true,
//       unique: true,
//     },
//     storeName: {
//       type: String,
//       default: '',
//     },
//     contactEmail: {
//       type: String,
//       default: '',
//     },
//     contactPhone: {
//       type: String,
//       default: '',
//     },
//     codEnabled: {
//       type: Boolean,
//       default: true,
//     },
//     returnPolicy: {
//       type: String,
//       default: '',
//     },
//     aboutUs: {
//       type: String,
//       default: '',
//     },
//     facebook: {
//       type: String,
//       default: '',
//     },
//     instagram: {
//       type: String,
//       default: '',
//     },
//     tiktok: {
//       type: String,
//       default: '',
//     },
//     website: {
//       type: String,
//       default: '',
//     },
//     logo: {
//       type: String,
//       default: '', // URL of logo image
//     },
//     banner: {
//       type: String,
//       default: '', // Optional store banner image
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.models.SellerSettings || mongoose.model('SellerSettings', sellerSettingsSchema);




import mongoose from 'mongoose';

const sellerSettingsSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    storeName: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    contactPhone: { type: String, default: '' },
    codEnabled: { type: Boolean, default: true },
    returnPolicy: { type: String, default: '' },
    aboutUs: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    paymentDetails: {
      bankAccount: { type: String, default: '' },
      easyPaisaNumber: { type: String, default: '' },
      jazzCashNumber: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.models.SellerSettings || mongoose.model('SellerSettings', sellerSettingsSchema);
