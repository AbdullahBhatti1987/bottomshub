// app/api/categories/route.js
import responseHelper from '@/lib/responseHelper';

const categories = [
  'suits',
  'denim',
  'soft denim',
  'accessories',
  'shawls',
  '2 piece',
  '3 piece',
  'bottoms',
  'new arrivals',
  'bestsellers'
];

export const GET = async (req, res) => {
  return responseHelper.success(res, 'Categories fetched successfully', { categories });
};
