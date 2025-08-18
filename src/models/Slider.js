import mongoose from "mongoose";

const SliderSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String },
    buttonName: { type: String },
    buttonRoute: { type: String },
    // mainImage: { type: String, required: true }, // main slider image
    backgroundImage: { type: String }, // optional background
    // overlayImage: { type: String }, // optional PNG overlay
  },
  { timestamps: true }
);

export default mongoose.models.Slider || mongoose.model("Slider", SliderSchema);
