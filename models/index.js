const {
  User,
  userJoiRegisterSchema,
  userJoiEditSchema,
  userJoiLoginSchema,
} = require('./users');
const { Pet, petJoiSchema } = require('./pets');

const { News, getNewsQueryParam } = require('./news');
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
  getNewsQueryParam,
  Notice,
  noticesQueryParam,
  newNoticeSchema,
  Services,
};
