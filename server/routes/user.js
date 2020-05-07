const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = require('../secret/tokenSecret');
const SessionController = require('../controllers/SessionController');
const CookieController = require('../controllers/CookieController');
const UserController = require('../controllers/UserController');

router.post(
  '/register',
  UserController.checkDuplicates,
  UserController.hashPassword,
  UserController.createUser,
  SessionController.signToken,
  CookieController.setSessionCookie,
  (req, res, next) => {
    res.json(res.locals.username);
  }
);

module.exports = router;
