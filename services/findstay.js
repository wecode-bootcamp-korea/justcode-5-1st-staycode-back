const { readStay } = require('../models/findstay');

async function findstayInfo(condition, stay, priceRange, cnt, page) {
  const stayList = await readStay(condition, stay, priceRange, cnt, page);
  if (!stayList) {
    const error = new Error('STAYS_NOT_FOUND');
    error.statusCode = 404;
    throw error;
  }
  return stayList;
}

module.exports = { findstayInfo };
