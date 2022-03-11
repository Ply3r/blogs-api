const jwt = require('jsonwebtoken');
const { User } = require('../models');
const ValidateError = require('../utils/ValidateError');

const secret = process.env.JWT_SECRET;

const auth = async (req, _res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throw new ValidateError({ status: 401, message: 'Token not found' });

    const { email, password } = jwt.verify(authorization, secret);
    const userExists = await User.findOne({ where: { email, password } });

    if (!userExists) throw new ValidateError({ status: 401, message: 'Expired or invalid token' });

    req.user = userExists;
    next();
  } catch (err) {
    let error = err;
    if (!err.status) {
      error = new ValidateError({ status: 401, message: 'Expired or invalid token' });
    }
    next(error);
  }
};

module.exports = auth;