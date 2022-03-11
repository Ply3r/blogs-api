const Joi = require('joi');

const create = Joi.object({
  title: Joi.string().required()
    .messages({
      'any.required': '400|"title" is required',
      'string.empty': '400|"title" is not allowed to be empty"',
      'string.base': '400|"title" is a string',
    }),
  content: Joi.string().required()
    .messages({
      'any.required': '400|"content" is required',
      'string.base': '400|"content" is a string',
      'string.empty': '400|"content" is not allowed to be empty"',
    }),
  categoryIds: Joi.array().items(Joi.number()).required().messages({
    'any.required': '400|"categoryIds" is required',
  }),
});

module.exports = { create };
