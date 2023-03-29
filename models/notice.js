const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { mongooseErrorHandler } = require('../helpers');

const nameRegexp = /^([a-zA-Zа-яА-ЯёЁёЁЇїІіҐґЄє\s]+)$/;
const locationRegexp =
  /^([a-zA-Zа-яА-ЯІіЇїЄє]+){2}, ([a-zA-Zа-яА-ЯІіЇїЄє]+){2}$/;
const validCategory = ['sell', 'for-free', 'lost-found'];
const validGender = ['male', 'female'];

const noticeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for notice'],
    },
    breed: {
      type: String,
      required: [true, 'Set breed for notice'],
    },
    location: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      default: new Date(),
    },
    category: {
      type: String,
      enum: ['sell', 'for-free', 'lost-found'],
      required: true,
    },
    name: {
      type: String,
      default: 'new name',
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      required: true,
    },
    price: {
      type: Number,
      default: 5,
    },
    image: {
      type: String,
      required: true,
    },
    cloudinaryImagePublicId: {
      type: String,
      required: [true, "Cloudinary image ID wasn't supplied!"],
    },
    comments: {
      type: String,
      required: [true, 'Comment is required'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const newNoticeSchema = Joi.object({
  title: Joi.string()
    .min(2)
    .max(48)
    .pattern(nameRegexp, 'Title must contain only letters')
    .required('Title required'),
  breed: Joi.string()
    .min(2)
    .max(24)
    .pattern(nameRegexp, 'breed must contain only letters')
    .required('Breed required'),
  location: Joi.string()
    .pattern(locationRegexp, 'Location must be in format City, Region')
    .empty('')
    .default('City, Region'),
  birthDate: Joi.date()
    .min('1-1-1950')
    .max('now')
    .required('Birthday is required'),
  name: Joi.string()
    .pattern(nameRegexp, 'Name must contain only letters')
    .min(2)
    .max(16)
    .required('Name is required'),
  category: Joi.string()
    .valid(...validCategory)
    .required('Category is required'),
  sex: Joi.string().valid(...validGender),
  price: Joi.number().min(1),
  comments: Joi.string().min(8).max(120),
  image: Joi.string(),
});

const noticesQueryParam = Joi.object({
  limit: Joi.number()
    .min(1)
    .messages({
      'number.min': `"limit" must be equal or greater than {#limit}. You provided: {limit}`,
    })
    .optional(),
  page: Joi.number()
    .min(1)
    .messages({
      'number.min': `"page" must be equal or greater than {#limit}. You provided: {page}`,
    })
    .optional(),
  searchQuery: Joi.string().optional(),
});

noticeSchema.post('save', mongooseErrorHandler);
const Notice = model('notice', noticeSchema);
module.exports = {
  Notice,
  noticesQueryParam,
  newNoticeSchema,
};
