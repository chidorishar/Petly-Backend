const { ctrlWrapper } = require('./ctrlWrapper.js');
const userValidation = require('./userValidation.js');
const { validateBody, validateQueryParams } = require('./joiValidation');

module.exports = {
  ctrlWrapper,
  validateBody,
  validateQueryParams,
  userValidation,
};
