const { Schema, model } = require('mongoose');
const Joi = require('joi');

const { mongooseErrorHandler } = require('../helpers');

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    birthday: {
      type: Date,
      required: [true, 'Birthday is required'],
    },
    breed: {
      type: String,
      required: [true, 'Breed is required'],
    },
    photo: {
      type: String,
      required: [true, 'Photo is required'],
    },
    cloudinaryImagePublicId: {
      type: String,
      required: [true, "Cloudinary image ID wasn't supplied!"],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
    },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { versionKey: false }
);

const nameRegexp = /^([a-zA-Zа-яА-ЯёЁёЁЇїІіҐґЄє\s]+)$/;

const petJoiSchema = Joi.object({
  name: Joi.string()
    .pattern(nameRegexp, 'Name must contain only letters')
    .min(2)
    .max(16)
    .required('Name is required'),
  birthday: Joi.date()
    .min('1-1-1950')
    .max('now')
    .required('Birthday is required')
    .messages({
      'date.base': 'Incorrect date format',
      'date.format': 'Incorrect date format. Expected ISO format',
      'date.min': 'Birthday must be greater than 1950',
      'date.max': 'Birthday must be less than current date',
    }),
  breed: Joi.string()
    .pattern(nameRegexp, 'Breed must contain only letters')
    .min(3)
    .max(40)
    .required('Breed is required'),
  comment: Joi.string().min(8).max(120).required('Comment is required'),
});

petSchema.post('save', mongooseErrorHandler);
const Pet = model('pet', petSchema);

module.exports = { Pet, petJoiSchema };
