const { parseUserToken } = require("../services");


module.exports = async (req, res, next) => {
  if (req.method === 'options') {
    next();
  }
  try {
    await parseUserToken(req);

    next();
  } catch (error) {
    return next(error);
  }
};
