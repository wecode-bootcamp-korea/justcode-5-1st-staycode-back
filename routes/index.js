const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express');


const userRouter = require('./user');
const findstayRouter = require('./findestay');
// const otherRouter = require('./other');

const router = express.Router();

router.use(userRouter);
router.use(findstayRouter);
// router.use(otherRouter);

module.exports = router;
