const {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
} = require('./users');
const { Pet, petJoiSchema } = require('./pets');

const { News, getAllNewsQueryParam } = require('./news');
const { Notice, noticesQueryParam, newNoticeSchema } = require('./notice');
const { Services } = require('./services');

module.exports = {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
  Pet,
  petJoiSchema,
  News,
  getAllNewsQueryParam,
  Notice,
  noticesQueryParam,
  newNoticeSchema,
  Services,
};
