const express = require('express');
const router = express.Router();
const db = require('../models');
const userRouter = require('./user');
const buildingRouter = require('./building');
const doormanRouter = require('./doorman');

router.use('/user', userRouter);

router.use('/building', buildingRouter);

router.use('/doorman', doormanRouter);

router.get('/', (req, res, next) => {
  console.log('You got to /api!');
  res.status(200).send('hi');
});

module.exports = router;
