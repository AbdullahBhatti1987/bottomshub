// lib/uploadImageToCloudinary.js
import cloudinary from "./cloudinary.js";

export const uploadImageToCloudinary = async (
  base64Image,
  folder = "bottomshub/products"
) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder, // e.g. 'bottomshub/products' or 'bottomshub/banners'
    });

    return {
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    };
  } catch (error) {
    throw new Error("Image upload failed: " + error.message);
  }
};
