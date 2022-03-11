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

const findAll = async (_req, res, next) => {
  try {
    const posts = await postService.findAll();

    return res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.findOne(+id);

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, findOne };
