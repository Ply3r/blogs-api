const categoryService = require('../service/category.service.js');

const create = async (req, res, next) => {
  try { 
    const category = await categoryService.create(req.body);

    return res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

const findAll = async (_req, res, next) => {
  try { 
    const categories = await categoryService.findAll();

    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, findAll };