const userService = require('../service/user.service.js');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);

    return res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

const findAll = async (_req, res, next) => {
  try {
    const user = await userService.findAll();

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const { dataValues: { id } } = req.user;

    await userService.destroy(+id);

    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.findOne(+id);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const token = await userService.login(req.body);

    return res.status(200).json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll, destroy, findOne, login };
