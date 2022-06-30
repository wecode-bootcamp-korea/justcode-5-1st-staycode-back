const express = require('express');
const { getRoomController } = require('../controllers/room');

const roomRouter = express.Router();

roomRouter.get('/room/:id', getRoomController);

module.exports = roomRouter;
