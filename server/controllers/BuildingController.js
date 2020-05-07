const buildingController = {};
const db = require('../models');

buildingController.checkDuplicates = async (req, res, next) => {
  const query = {
    text: 'SELECT * from buildings WHERE address=$1',
    values: [req.body.address],
  };
  try {
    const result = await db.query(query);
    if (result.rows[0]) {
      console.log('Building Already Exists');
      return res.redirect('/');
    } else {
      next();
    }
  } catch (err) {
    next({
      log: `Error in BuildingController.checkDuplicates: ${err}`,
      status: 500,
      message: 'Couldnt see if there were duplicate users',
    });
  }
};

buildingController.createBuilding = async (req, res, next) => {
  const { address, city, state, zip, borough, type } = req.body;
  try {
    const query = {
      text: `INSERT INTO buildings(address, city, state, postalcode, borough, type)
            VALUES($1, $2, $3, $4, $5, $6) returning *`,
      values: [address, city, state, zip, borough, type],
    };
    const queryResult = await db.query(query);
    next();
  } catch (err) {
    next({
      log: `Error in buildingController.createBuilding: ${err}`,
      status: 500,
      message: 'Failed to create building',
    });
  }
};

buildingController.getBuildings = async (req, res, next) => {
  const { address } = req.query;
  const query = {
    text: `SELECT * from buildings WHERE address like $1 LIMIT 5`,
    values: ['%' + address + '%'],
  };
  try {
    const queryResults = await db.query(query);
    res.locals.results = queryResults.rows;
    next();
  } catch (err) {
    next({
      log: `Error in buildingController.getBuildings: ${err}`,
      status: 500,
      message: 'Failed to find buildings',
    });
  }
};
module.exports = buildingController;
