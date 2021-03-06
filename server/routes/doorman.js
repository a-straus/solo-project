const express = require('express');
const router = express.Router();
const DoormanController = require('../controllers/DoormanController');

router.post(
  '/create',
  DoormanController.checkDuplicates,
  DoormanController.createDoorman,
  DoormanController.createBuildings_doormen,
  DoormanController.createUsers_doormen,
  (req, res, next) => {
    res.status(200).send();
  }
);

router.get('/', (req, res, next) => {
  res.status(200).json(res.locals.results);
});

module.exports = router;
