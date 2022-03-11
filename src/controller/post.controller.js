const postService = require('../service/post.service.js');

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const { dataValues: { id: userId } } = req.user;

    const post = await postService.create({ ...data, userId });

    return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
