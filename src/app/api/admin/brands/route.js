// import { connectDb } from "@/lib/connectDb";
// import Brand from "@/models/Brand";
// import responseHelper from "@/lib/responseHelper";

// export async function GET() {
//   await connectDb();
//   try {
//     const brands = await Brand.find({ isActive: true });
//     return responseHelper.success(brands);
//   } catch (error) {
//     return responseHelper.serverError("Failed to fetch brands");
//   }
// }

// export async function POST(req) {
//   await connectDb();
//   try {
//     const { name, logo, description } = await req.json();

//     if (!logo) {
//       return responseHelper.badRequest("Logo is required");
//     }

//     if (!name) return responseHelper.badRequest("Brand name is required");

//     // Check for existing brand
//     const exists = await Brand.findOne({ name });
//     if (exists) return responseHelper.badRequest("Brand already exists");

//     // Upload image to Cloudinary
//     const { url: imageUrl, thumbnail } = await uploadImageToCloudinary(
//       image,
//       "bottomshub/categories"
//     );

//     const brand = await Brand.create({
//       name: name.trim(),
//       logo: imageUrl,
//       description,
//       thumbnail,
//       isActive: true
//     });

//     return responseHelper.success(brand, "Brand created successfully");
//   } catch (error) {
//     return responseHelper.serverError("Failed to create brand");
//   }
// }

import { connectDb } from "@/lib/connectDb";
import Brand from "@/models/Brand";
import responseHelper from "@/lib/responseHelper";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";
// import { uploadImageToCloudinary } from "@/lib/cloudinary"; // Make sure this path is correct

export async function GET() {
  await connectDb();
  try {
    const brands = await Brand.find({ isActive: true });
    return responseHelper.successArray(brands);
  } catch (error) {
    console.error("Fetch Brands Error:", error);
    return responseHelper.serverError("Failed to fetch brands");
  }
}

export async function POST(req) {
  await connectDb();
  try {
    const { name, logo, description } = await req.json();

    if (!logo) {
      return responseHelper.badRequest("Logo is required");
    }

    if (!name || !name.trim()) {
      return responseHelper.badRequest("Brand name is required");
    }

    // Check for existing brand by name (case insensitive)
    const exists = await Brand.findOne({
      name: { $regex: `^${name.trim()}$`, $options: "i" },
    });
    if (exists) return responseHelper.badRequest("Brand already exists");

    // Upload image to Cloudinary
    // Assuming logo is a base64 or URL string that you want to upload
    // const { url: imageUrl, thumbnailUrl } = await uploadImageToCloudinary(
    //   logo,
    //   "bottomshub/brands"
    // );
    // console.log("Cloudinary Upload Result:", { imageUrl, thumbnailUrl });

    const { url, thumbnailUrl } = await uploadImageToCloudinary(
      logo,
      "bottomshub/brands"
    );
    console.log("url:", url);
    console.log("thumbnailUrl:", thumbnailUrl);

    const brand = await Brand.create({
      name: name.trim(),
      logo: url,
      description,
      thumbnail: thumbnailUrl,
      isActive: true,
    });
    console.log("Created Brand:", brand);

    return responseHelper.success(brand, "Brand created successfully");
  } catch (error) {
    console.error("Create Brand Error:", error);
    return responseHelper.serverError("Failed to create brand");
  }
}
