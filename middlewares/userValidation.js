const { utils } = require('../services');

module.exports = async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    await utils.parseUserToken(req);

    next();
  } catch (error) {
    return next(error);
  }
};
