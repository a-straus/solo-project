const userController = {};
const db = require('../models');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

userController.checkDuplicates = async (req, res, next) => {
  const query = {
    text: `SELECT * FROM users WHERE username=$1`,
    values: [req.body.username],
  };
  try {
    const result = await db.query(query);
    if (result.rows[0]) {
      console.log('User Already Exists');
      return res.status(409).send();
    } else {
      next();
    }
  } catch (err) {
    next({
      log: `Error checking duplicate users: ${err}`,
      status: 500,
      message: `Couldn't see if there were duplicate users`,
    });
  }
};

userController.hashPassword = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    res.locals.hashedPassword = hashedPassword;
    next();
  } catch (err) {
    next({
      log: `Error hashing user password: ${err}`,
      status: 500,
      message: `Failed to hash user password!`,
    });
  }
};

userController.decryptPassword = async (req, res, next) => {
  const { hashedPassword } = res.locals.user;
  const { password } = req.body;
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    console.log('match: ', match);
    if (match) {
      next();
    } else {
      res.status(403).send();
    }
  } catch (err) {
    next({
      log: `Error in userController.decryptPassword: ${err}`,
      status: 500,
      message: 'Could not decrypt password',
    });
  }
};

userController.findUser = async (req, res, next) => {
  const { username } = req.body;
  const query = {
    text: `SELECT id, username, password FROM users where username = $1`,
    values: [username],
  };
  try {
    const queryResult = await db.query(query);
    if (!queryResult.rows[0]) {
      res.status(404).send();
    } else {
      const user = {
        username: queryResult.rows[0].username,
        hashedPassword: queryResult.rows[0].password,
        id: queryResult.rows[0].id,
      };
      res.locals.user = user;
      next();
    }
  } catch (err) {
    next({
      log: `Error in userController.findUser: ${err}`,
      status: 500,
      message: 'Couldnt Find User',
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { username } = req.body;
  const { hashedPassword } = res.locals;
  try {
    const query = `INSERT INTO users(username, password) VALUES($1, $2) returning *`;
    const values = [username, hashedPassword];
    const queryResult = await db.query(query, values);
    const user = {
      username: queryResult.rows[0].username,
      id: queryResult.rows[0].id,
    };
    res.locals.user = user;
    next();
  } catch (err) {
    next({
      log: `Error creating user: ${err}`,
      status: 500,
      message: `Failed to create user!`,
    });
  }
};

module.exports = userController;
