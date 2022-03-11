const { Category } = require('../models');

const create = async (data) => {
  const category = await Category.create(data);

  return category;
};

const findAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = { create, findAll };
