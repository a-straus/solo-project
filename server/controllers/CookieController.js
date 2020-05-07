const CookieController = {};

CookieController.setSessionCookie = (req, res, next) => {
  try {
    const { token } = res.locals;
    res.cookie('token', token);
    next();
  } catch (err) {
    next({
      log: `Failed in setSessionCookie: ${err}`,
      status: 500,
      message: 'Couldnt set Session cookie',
    });
  }
};

module.exports = CookieController;
