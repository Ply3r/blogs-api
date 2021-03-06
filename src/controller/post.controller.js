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

const findBySearch = async (req, res, next) => {
  try {
    const { q: query } = req.query;
    const posts = await postService.findBySearch(query);

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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;
    const data = req.body;

    const post = await postService.update({ id: +id, userId, ...data });

    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    await postService.destroy({ id: +id, userId });

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { create, update, destroy, findAll, findOne, findBySearch };
