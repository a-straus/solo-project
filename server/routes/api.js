const express = require('express');
const router = express.Router();
const db = require('../models');
const userRouter = require('./user');

router.use('/user', userRouter);

router.get('/', (req, res, next) => {
  console.log('You got to /api!');
  res.status(200).send('hi');
});

module.exports = router;
