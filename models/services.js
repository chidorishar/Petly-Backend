const { Schema, model } = require('mongoose');

const workDaysSubSchema = Schema({
  isOpen: Boolean,
  from: String,
  to: String,
});

const servicesSchema = Schema(
  {
    title: {
      type: String,
      required: [true, 'Please, add the name of your company'],
      unique: true,
      description: 'Company name',
    },
    url: {
      type: String,
      unique: true,
      description: 'Website link',
    },
    addressUrl: {
      type: String,
      description: 'Company adress link on google maps',
    },
    imageUrl: {
      type: String,
      unique: true,
      description: 'Link to company logo',
    },
    address: {
      type: String,
      description: 'Company address',
    },
    workDays: [
      { type: workDaysSubSchema, description: 'Company work schedule' },
    ],
    phone: {
      type: String,
      description: 'Company contact phone number',
    },
    email: {
      type: String,
      unique: true,
      description: 'Company contact email',
    },
  },
  { versionKey: false }
);

const Services = model('service', servicesSchema);

module.exports = { Services };
