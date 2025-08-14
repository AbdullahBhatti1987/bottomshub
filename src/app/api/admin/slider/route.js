import responseHelper from "@/lib/responseHelper";
import Slider from "@/models/Slider";
import { connectDb } from "@/lib/connectDb";
import { uploadImageToCloudinary } from "@/lib/uploadImageToCloudinary";

export const dynamic = "force-dynamic";

export async function GET(req) {
  await connectDb();
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    return responseHelper.successArray(sliders);
  } catch (err) {
    console.error("GET Slider Error:", err);
    return responseHelper.serverError("Failed to fetch sliders");
  }
}

export async function POST(req) {
  await connectDb();
  try {
    const body = await req.json();
    const {
      heading,
      content,
      buttonName,
      buttonRoute,
      mainImage,
      backgroundImage,
      overlayImage,
    } = body;

    if (!heading || !mainImage) {
      return responseHelper.badRequest("Heading and mainImage are required");
    }

    // Upload main image
    const { url: mainImageUrl } = await uploadImageToCloudinary(
      mainImage,
      "bottomshub/sliders"
    );

    // Upload background if exists
    let backgroundImageUrl = "";
    if (backgroundImage) {
      const { url } = await uploadImageToCloudinary(
        backgroundImage,
        "bottomshub/sliders/background"
      );
      backgroundImageUrl = url;
    }

    // Upload overlay if exists
    let overlayImageUrl = "";
    if (overlayImage) {
      const { url } = await uploadImageToCloudinary(
        overlayImage,
        "bottomshub/sliders/overlay"
      );
      overlayImageUrl = url;
    }

    const slider = await Slider.create({
      heading,
      content,
      buttonName,
      buttonRoute,
      mainImage: mainImageUrl,
      backgroundImage: backgroundImageUrl,
      overlayImage: overlayImageUrl,
    });

    return responseHelper.success({ data: slider }, "Slider created");
  } catch (err) {
    console.error("POST Slider Error:", err);
    return responseHelper.serverError("Failed to create slider");
  }
}
