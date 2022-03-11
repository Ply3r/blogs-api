const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ValidateError = require('../utils/ValidateError');

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  const { email, password } = jwt.verify(authorization, secret);

  if (!authorization) {
    throw new ValidateError({ status: 401, message: 'Token not found' });
  }

  const userExists = await User.findOne({ where: { email, password } });
  if (!userExists) {
    throw new ValidateError({ status: 401, message: 'Expired or invalid token' });
  }

  next();
};

module.exports = auth;