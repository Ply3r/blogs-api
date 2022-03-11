const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ValidateError = require('../utils/ValidateError.js');

const secret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '24h',
  algorithm: 'HS256',
};

const create = async (data) => {
  const { email, password } = data;

  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    throw new ValidateError({ status: 409, message: 'User already registered' });
  }

  await User.create(data);

  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return { token };
};

module.exports = { create };
