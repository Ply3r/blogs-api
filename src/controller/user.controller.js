const userService = require('../service/user.service.js');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);

    return res.status(201).json(token);
  } catch (err) {
    next(err);
  }
};

module.exports = { create };
