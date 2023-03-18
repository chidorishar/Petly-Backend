const {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
} = require('./users');
const { Pet, petJoiSchema } = require('./pets');

const { News } = require("./news");

module.exports = {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
  Pet,
  petJoiSchema,
  News
};


