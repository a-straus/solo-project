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
      text: `INSERT INTO buildings(address, city, state, zip, borough, type)
            VALUES($1, $2, $3, $4, $5, $6) returning *`,
      values: [addres, city, state, zip, borough, type],
    };
    const queryResult = await db.query(query, values);
  } catch (err) {
    next({
      log: `Error in buildingController.createBuilding: ${err}`,
      status: 500,
      message: 'Failed to create building',
    });
  }
};

module.exports = buildingController;
