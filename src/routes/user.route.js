const express = require('express');
const validate = require('../middleware/validate.js');
const user = require('../controller/user.controller.js');

const userSchema = require('../schema/user.js');

const router = express.Router();

router
  .route('/')
  .post(
    validate(userSchema),
    user.create,
  );

module.exports = router;
