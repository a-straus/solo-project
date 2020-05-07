const doormanController = {};
const db = require('../models');

doormanController.checkDuplicates = async (req, res, next) => {
  const { firstname, lastname } = req.body;
  const query = {
    text: 'SELECT * from doormen WHERE firstname=$1 AND lastname=$2',
    values: [firstname, lastname],
  };
  try {
    const result = await db.query(query);
    if (result.rows[0]) {
      console.log('Doorman Already Exists');
      return res.redirect('/');
    } else {
      next();
    }
  } catch (err) {
    next({
      log: `Error in doormanController.checkDuplicates: ${err}`,
      status: 500,
      message: 'Couldnt see if there were duplicate users',
    });
  }
};

doormanController.createDoorman = async (req, res, next) => {
  console.log('req.body inside createDoorman: ', req.body);
  const { firstname, lastname, super: superIntendent, night, specialty } = req.body;
  try {
    const query = {
      text: `INSERT INTO doormen(firstname, lastname, super, night, specialty)
          VALUES($1, $2, $3, $4, $5) returning *`,
      values: [firstname, lastname, superIntendent, night, specialty],
    };
    const queryResult = await db.query(query);
    res.locals.doorman_id = queryResult.rows[0].id;
    next();
  } catch (err) {
    next({
      log: `Error in doormanController.createDoorman: ${err}`,
      status: 500,
      message: 'Failed to create doorman',
    });
  }
};

doormanController.createBuildings_doormen = async (req, res, next) => {
  const { buildings } = req.body;
  console.log('buildings inside createBuildings_doormen: ', buildings);
  const { doorman_id } = res.locals;
  try {
    for (let i = 0; i < buildings.length; i++) {
      const query = {
        text: `INSERT INTO buildings_doormen (building_id, doorman_id)
      VALUES($1, $2)`,
        values: [buildings[i], doorman_id],
      };
      await db.query(query);
    }
    next();
  } catch (err) {
    next({
      log: `Error in doormanController.createBuildings_doormen: ${err}`,
      status: 500,
      message: 'Couldnt create doorman',
    });
  }
};

doormanController.createUsers_doormen = async (req, res, next) => {
  const { user_id } = req.body;
  const { doorman_id } = res.locals;
  try {
    const query = {
      text: `INSERT INTO users_doormen (user_id, doorman_id) VALUES ($1, $2)`,
      values: [user_id, doorman_id],
    };
    await db.query(query);
    next();
  } catch (err) {
    next({
      log: `Error in doormanController.createUsers_doormen: ${err}`,
      status: 500,
      message: 'Couldnt create doorman',
    });
  }
};
module.exports = doormanController;
