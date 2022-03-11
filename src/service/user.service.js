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

const findAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return users;
};

const findOne = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    throw new ValidateError({ status: 404, message: 'User does not exist' });
  }

  return user;
};

const destroy = async (id) => {
  await User.destroy({ where: { id } });
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    throw new ValidateError({ status: 400, message: 'Invalid fields' });
  }

  const token = jwt.sign({ email, password }, secret, jwtConfig);
  return { token };
};

module.exports = { create, findAll, destroy, findOne, login };
