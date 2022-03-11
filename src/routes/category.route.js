const express = require('express');
const auth = require('../middleware/auth.js');
const validate = require('../middleware/validate.js');
const category = require('../controller/category.controller.js');

const categorySchema = require('../schema/category.js');

const router = express.Router();

router
  .route('/categories')
  .post(
    auth,
    validate(categorySchema.create),
    category.create,
  );

module.exports = router;
