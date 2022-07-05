const express = require('express');
const { homeController } = require('../controllers/home');

const router = express.Router();

router.get('/home', homeController);
//router.post('/login', loginController);

module.exports = router;
