const { readAccomodationById } = require('../models/accomodation');

async function getAccomodationService(id) {
  const accomodationList = await readAccomodationById(id);
  if (!accomodationList) {
    const error = new Error('ACCOMODATION_NOT_FOUND');
    error.statusCode = 404;
    throw error;
  }
  return accomodationList;
}

module.exports = { getAccomodationService };
