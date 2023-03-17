const {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
} = require('./users');
const { Pet, petJoiSchema } = require('./pets');

module.exports = {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
  Pet,
  petJoiSchema,
};
