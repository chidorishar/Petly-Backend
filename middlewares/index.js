const { ctrlWrapper } = require('./ctrlWrapper.js');
const { validateBody, validateQueryParams } = require('./joiValidation');

module.exports = { ctrlWrapper, validateBody, validateQueryParams };
