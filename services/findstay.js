const { readStay } = require('../models/findstay');

async function findstayInfo(condition, stay, priceRange, cnt, page, search) {
  const stayList = await readStay(
    condition,
    stay,
    priceRange,
    cnt,
    page,
    search
  );
  if (!stayList) {
    const error = new Error('STAYS_NOT_FOUND');
    error.statusCode = 404;
    throw error;
  }
  return stayList;
}

module.exports = { findstayInfo };
