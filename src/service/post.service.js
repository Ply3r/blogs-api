const { BlogPost, PostsCategory, Category } = require('../models');
const ValidateError = require('../utils/ValidateError.js');

const create = async ({ title, content, categoryIds, userId }) => {
  const { dataValues: { id: postId } } = await BlogPost.create({ title, content, userId });

  await Promise.all(
    categoryIds.map(async (categoryId) => {
      const categoryExists = await Category.findOne({ where: { id: categoryId } });

      if (!categoryExists) {
        throw new ValidateError({ status: 400, message: '"categoryIds" not found' });
      }
      
      await PostsCategory.create({ postId, categoryId });
    }),
  );

  return { id: postId, userId, title, content };
};

module.exports = { create };
