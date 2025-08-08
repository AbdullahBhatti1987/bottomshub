import Product from "@/models/Product";

// Sample: get similar products by category, brand, or tag
export const getRecommendedProducts = async (productId) => {
  const product = await Product.findById(productId);
  const recommendations = await Product.find({
    _id: { $ne: productId },
    category: product.category,
  }).limit(6);
  return recommendations;
};
