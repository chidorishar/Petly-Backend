const { Schema, model } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minLength: 7,
    },
    name: {
      type: String,
      default: 'New user',
    },
    location: {
      type: String,
      default: 'City, Region',
    },
    phone: {
      type: String,
      default: '+380000000000',
    },
    birthday: {
      type: Date,
      default: '00.00.0000',
    },
    token: {
      type: String,
      default: null,
    },
    favorite: [
      {
        type: Schema.ObjectId,
        ref: 'notices',
      },
    ],
    avatarURL: { type: String, default: null },
  },

  {
    methods: {
      setAvatar(path = null) {
        const pathToImg = path ?? gravatar.url(this.email, { s: '250' });
        this.avatarURL = pathToImg;
      },
      // Хеш пароля при регістрації
      setPassword: function (password) {
        this.password = bcrypt.hashSync(password, 10);
      },

      // Хеш пароля при логіні
      comparePassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    versionKey: false,
  }
);

const emailRegexp =
  /^([a-zA-Z0-9_.]+){1}([a-zA-Z0-9_\-.]+){1}@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,3})$/;
const passwordRegexp =
  /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&()-_/#:;<>])[A-Za-z\d@$!%*?&]/;
const nameRegexp = /^([a-zA-Zа-яА-ЯІіЇїЄє\s]+)$/;
const phoneRegexp = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
const locationRegexp =
  /^([a-zA-Zа-яА-ЯІіЇїЄє]+){2}, ([a-zA-Zа-яА-ЯІіЇїЄє]+){2}$/;

const joiRegisterSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(6)
    .max(63)
    .required('Email must be in format mail@mail.com'),
  password: Joi.string()
    .pattern(
      passwordRegexp,
      'At least one upper and lowercase letter, number, special character, space is not allowed'
    )
    .min(7)
    .max(32)
    .required('Password is required'),
  name: Joi.string()
    .pattern(nameRegexp, 'Name must contain only letters')
    .empty('')
    .default('New User'),
  location: Joi.string()
    .pattern(locationRegexp, 'Location must be in format City, Region')
    .empty('')
    .default('City, Region'),
  phone: Joi.string()
    .max(13)
    .pattern(phoneRegexp, 'Mobile phone must be in format +380xxxxxxxxx')
    .empty('')
    .default('+380000000000'),
});

const joiEditSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(6)
    .max(63),
  name: Joi.string().pattern(nameRegexp, 'Name must contain only letters'),
  location: Joi.string().pattern(
    locationRegexp,
    'Location must be in format City, Region'
  ),
  phone: Joi.string()
    .max(13)
    .pattern(phoneRegexp, 'Mobile phone must be in format +380xxxxxxxxx'),
});

const joiLoginSchema = Joi.object({
  email: Joi.string()
    .email()
    .pattern(emailRegexp, 'Email must be in format mail@mail.com')
    .min(10)
    .max(63)
    .required('Email must be in format mail@mail.com'),
  password: Joi.string()
    .pattern(passwordRegexp, 'Whitespace is not allowed')
    .min(7)
    .max(32)
    .required('Password is required'),
});

const User = model('user', userSchema);
module.exports = {
  User,
  joiRegisterSchema,
  joiEditSchema,
  joiLoginSchema,
};
