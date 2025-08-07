// app/api/tags/route.js
import responseHelper from '@/lib/responseHelper';

const tags = [
  'summer',
  'winter',
  'cotton',
  'embroidered',
  'casual',
  'party wear',
  'unstitched',
  'stitched',
  'luxury',
  'denim',
  'soft',
  'sale',
  'new arrival'
];

export const GET = async (req, res) => {
  return responseHelper.success(res, 'Tags fetched successfully', { tags });
};
