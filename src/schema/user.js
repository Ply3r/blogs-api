const Joi = require('joi');

const create = Joi.object({
  displayName: Joi.string().min(8).required()
    .messages({
      'any.required': '400|"displayName" is required',
      'string.empty': '400|"displayName" is not allowed to be empty"',
      'string.base': '400|"displayName" is a string',
      'string.min': '400|"displayName" length must be at least 8 characters long',
    }),
  email: Joi.string().email().required()
    .messages({
      'any.required': '400|"email" is required',
      'string.base': '400|"email" is a string',
      'string.empty': '400|"email" is not allowed to be empty"',
      'string.email': '400|"email" must be a valid email',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'any.required': '400|"password" is required',
      'string.base': '400|"password" is a string',
      'string.empty': '400|"password" is not allowed to be empty"',
      'string.min': '400|"password" length must be 6 characters long',
    }),
  image: Joi.string().allow(null, '').required()
    .messages({
      'any.required': '400|"image" is required',
      'string.base': '400|"image" is a string',
    }),
});

const login = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'any.required': '400|"email" is required',
      'string.base': '400|"email" is a string',
      'string.empty': '400|"email" is not allowed to be empty',
      'string.email': '400|"email" must be a valid email',
    }),
  password: Joi.string().min(6).required()
    .messages({
      'any.required': '400|"password" is required',
      'string.base': '400|"password" is a string',
      'string.empty': '400|"password" is not allowed to be empty',
      'string.min': '400|"password" length must be 6 characters long',
    }),
});

module.exports = { create, login };
