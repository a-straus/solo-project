const express = require('express');
const router = express.Router();
const DoormanController = require('../controllers/DoormanController');

router.post(
  '/create',
  DoormanController.checkDuplicates,
  DoormanController.createDoorman,
  (req, res, next) => {
    res.status(200).send();
  }
);

module.exports = router;
