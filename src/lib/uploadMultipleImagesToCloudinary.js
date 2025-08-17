import cloudinary from './cloudinary.js';

export const uploadMultipleImagesToCloudinary = async (base64Images = [], folder = 'bottomshub/products') => {
  if (!Array.isArray(base64Images) || base64Images.length === 0) {
    throw new Error("No images provided for upload.");
  }

  const uploaded = [];

  for (const base64Image of base64Images) {
    try {
      const result = await cloudinary.uploader.upload(base64Image, {
        folder,
        transformation: [
          { width: 800, height: 800, crop: 'limit' } 
        ]
      });

      const { secure_url, public_id } = result;

      const thumbnailUrl = cloudinary.url(public_id, {
        width: 300,
        height: 100,
        crop: 'thumb',
        gravity: 'center',
        secure: true,
      });

      uploaded.push({
        url: secure_url,
        thumbnailUrl,
        public_id,
      });

    } catch (err) {
      console.error("Failed to upload image:", err.message);
      throw new Error("Image upload failed: " + err.message);
    }
  }

  return uploaded;
};
