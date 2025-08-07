// app/api/sizes/route.js
import responseHelper from '@/lib/responseHelper';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];

export const GET = async (req, res) => {
  return responseHelper.success(res, 'Sizes fetched successfully', { sizes });
};
