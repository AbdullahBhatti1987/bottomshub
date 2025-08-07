import cloudinary from './cloudinary.js';

export const uploadImageToCloudinary = async (fileBase64, folder = 'bottomshub/products') => {
  try {
    // Upload the original image (you can control size here too)
    const uploadResponse = await cloudinary.uploader.upload(fileBase64, {
      folder,
      transformation: [
        { width: 500, height: 500, crop: 'limit' } // Resize original to max 500x500
      ]
    });

    const { secure_url, public_id } = uploadResponse;

    // Create a thumbnail URL using Cloudinary transformations (100x100 center-cropped)
    const thumbnailUrl = cloudinary.url(public_id, {
      width: 100,
      height: 100,
      crop: 'thumb',
      gravity: 'center',
      secure: true,
    });

    return {
      url: secure_url,         // Resized image (500x500)
      thumbnailUrl,            // Generated thumbnail (100x100)
      public_id,
    };

  } catch (error) {
    throw new Error('Image upload failed: ' + error.message);
  }
};



// {
//   url: 'https://res.cloudinary.com/.../image/upload/v123456/bottomshub/products/abc123.jpg',
//   thumbnailUrl: 'https://res.cloudinary.com/.../image/upload/c_thumb,g_center,w_100,h_100/v123456/bottomshub/products/abc123.jpg',
//   public_id: 'bottomshub/products/abc123'
// }
