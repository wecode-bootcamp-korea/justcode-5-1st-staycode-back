const { readPromotion } = require('../models/promotion');

async function promotionInfo() {
  const promotionList = await readPromotion();
  if (!promotionList) {
    const error = new Error('PROMOTION_NOT_FOUND');
    error.statusCode = 404;
    throw error;
  }
  return promotionList;
}

module.exports = { promotionInfo };
