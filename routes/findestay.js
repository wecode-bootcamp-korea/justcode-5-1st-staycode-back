const express = require('express');
const { findstayController } = require('../controllers/findstay');

const router = express.Router();

//router.get('/findstay', findstayController);
router.get('/findstay', findstayController);
//router.post('/login', loginController);

module.exports = router;
