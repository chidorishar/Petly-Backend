const Joi = require('joi');
const { Schema, model } = require('mongoose');

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, add title to your news'],
      unique: true,
      description: 'News title',
    },
    description: {
      type: String,
      required: false,
      description: 'News description',
    },
    date: {
      type: Date,
      default: Date.now,
      description: 'News creation date',
    },
    link: {
      type: String,
      match:
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      description: 'Link to full news',
    },
  },
  { versionKey: false }
);

const getNewsQueryParam = Joi.object({
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
});

const News = model('news', newsSchema);

module.exports = {
  News,
  getNewsQueryParam,
};
