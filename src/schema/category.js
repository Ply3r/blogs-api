const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().required()
    .messages({
      'any.required': '400|"name" is required',
      'string.empty': '400|"name" is not allowed to be empty"',
      'string.base': '400|"name" is a string',
    }),
});

module.exports = { create };