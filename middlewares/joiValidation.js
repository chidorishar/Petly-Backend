const { BadRequest } = require('http-errors');

const validateWithJoiSchema = (
  schema,
  isBodyValidation = true,
  errorMessage
) => {
  const func = (req, res, next) => {
    const data = isBodyValidation ? req.body : req.query;
    const { error } = schema.validate(data);
    if (error) next(new BadRequest(errorMessage));

    next();
  };

  return func;
};

const validateBody = (schema, errorMessage = 'missing fields') => {
  return validateWithJoiSchema(schema, true, errorMessage);
};

const validateQueryParams = (schema, errorMessage = 'missing fields') => {
  return validateWithJoiSchema(schema, false, errorMessage);
};

module.exports = { validateBody, validateQueryParams };
