const express = require('express');
const { getAccomodationController } = require('../controllers/accomodation');

const accomodationRouter = express.Router();

accomodationRouter.get('/accomodation/:id', getAccomodationController);

module.exports = accomodationRouter;
