const express = require('express');
const auth = require('../middleware/auth.js');
const validate = require('../middleware/validate.js');
const user = require('../controller/user.controller.js');

const userSchema = require('../schema/user.js');

const router = express.Router();

router
  .route('/user')
  .get(
    auth,
    user.findAll,
  )
  .post(
    validate(userSchema.create),
    user.create,
  );

router
  .route('/login')
  .post(
    validate(userSchema.login),
    user.login,
  );

module.exports = router;
