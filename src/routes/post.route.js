const express = require('express');
const auth = require('../middleware/auth.js');
const validate = require('../middleware/validate.js');
const post = require('../controller/post.controller.js');

const postSchema = require('../schema/post.js');

const router = express.Router();

router
  .route('/post')
  .get(
    auth,
    post.findAll,
  )
  .post(
    auth,
    validate(postSchema.create),
    post.create,
  );

router
  .route('/post/search')
  .get(
    auth,
    post.findBySearch,
  );

router
  .route('/post/:id')
  .get(
    auth,
    post.findOne,
  )
  .put(
    auth,
    validate(postSchema.update),
    post.update,
  )
  .delete(
    auth,
    post.destroy,
  );

module.exports = router;
