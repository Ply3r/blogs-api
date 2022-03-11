const { Category } = require('../models');

const create = async (data) => {
  const category = await Category.create(data);

  return category;
};

module.exports = { create };
