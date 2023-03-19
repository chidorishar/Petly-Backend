const { Schema, model } = require("mongoose");
const Joi = require('joi');

const noticeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Set title for notice"],
    minLength: 2,
    maxLength: 48,
    match: /^[a-zA-Z]+$/
  },
  breed: {
    type: String,    
    minLength: 2,
    maxLength: 24,
    match: /^[a-zA-Z]+$/
  },
  location: {
    type: String,
    required: true
  },
  birthDate: {
    type: String,
    required: true
  },
  category:{
    type: String,  
    enum: ["sell", "for-free", "lost-found"], 
    required: true
  },
  name: {
    type: String,   
    minLength: 2,
    maxLength: 16,
    match: /^[a-zA-Z]+$/
  },
  sex:{
    type: String,   
    enum: ["male", "female"],
    required: true
  },
  price:{
    type: Number,   
  },
  image:{
    type: String,   
    required: true
  },
  comments: {
    type: String,   
    minLength: 8,
    maxLength: 120,
    required: [true, 'Comment is required'],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',    
  },
});

const Notice = model("notice", noticeSchema);

const getNoticesQueryParam = Joi.object({
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


module.exports = {
  Notice, getNoticesQueryParam
};
