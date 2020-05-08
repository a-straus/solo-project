const express = require('express');
const router = express.Router();
const BuildingController = require('../controllers/BuildingController');

router.post(
  '/create',
  BuildingController.checkDuplicates,
  BuildingController.createBuilding,
  BuildingController.createUsers_buildings,
  (req, res, next) => {
    res.status(200).send();
  }
);
router.get('/', BuildingController.getBuildings, (req, res, next) => {
  res.status(200).json(res.locals.results);
});

module.exports = router;
