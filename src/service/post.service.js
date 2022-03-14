const Sequelize = require('sequelize');
const { User, BlogPost, PostsCategory, Category } = require('../models');
const ValidateError = require('../utils/ValidateError.js');

const { Op } = Sequelize;

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

const findAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { 
        model: User, 
        foreignKey: 'userId',
        attributes: { exclude: ['password'] },
        as: 'user',
      },
      { 
        model: Category, 
        foreignKey: 'categoryId',
        as: 'categories',
      },
    ],
  });

  return posts;
};

const findOne = async (id) => {
  const post = await BlogPost.findOne({
    include: [
      { 
        model: User, 
        foreignKey: 'userId',
        attributes: { exclude: ['password'] },
        as: 'user',
      },
      { 
        model: Category, 
        foreignKey: 'categoryId',
        as: 'categories',
      },
    ],
    where: { id },
  });

  if (!post) throw new ValidateError({ status: 404, message: 'Post does not exist' });

  return post;
};

const makeFindBySearchQuery = (query) => ({
  include: [
    { 
      model: User, 
      foreignKey: 'userId',
      attributes: { exclude: ['password'] },
      as: 'user',
    },
    { 
      model: Category, 
      foreignKey: 'categoryId',
      as: 'categories',
    },
  ],
  where: Sequelize.where(
    Sequelize.fn('concat', Sequelize.col('title'), ' ', Sequelize.col('content')),
    { [Op.like]: `%${query}%` },
  ),
});

const findBySearch = async (query) => {
  if (!query) {
    const post = await BlogPost.findAll({
      include: [{ 
          model: User, 
          foreignKey: 'userId',
          attributes: { exclude: ['password'] },
          as: 'user',
        },
        { 
          model: Category, 
          foreignKey: 'categoryId',
          as: 'categories',
        }],
    }); return post;
  }

  const post = await BlogPost.findAll(makeFindBySearchQuery(query));

  if (!post) throw new ValidateError({ status: 404, message: 'Post does not exist' });

  return post;
};

const update = async ({ id, userId, ...data }) => {
  if (id !== userId) throw new ValidateError({ status: 401, message: 'Unauthorized user' });

  const post = await BlogPost.findOne({
    include: [
      { 
        model: Category, 
        foreignKey: 'categoryId',
        as: 'categories',
      },
    ],
    where: { id },
  });
  
  if (!post) throw new ValidateError({ status: 404, message: 'Post does not exist' });
  
  await BlogPost.update(data, { where: { id } });

  return { ...post.dataValues, ...data };
};

const destroy = async ({ id, userId }) => {
  const post = await findOne(id);
  
  if (!post) throw new ValidateError({ status: 404, message: 'Post does not exist' });
  if (id !== userId) throw new ValidateError({ status: 401, message: 'Unauthorized user' });
  
  await BlogPost.destroy({ where: { id } });
};

module.exports = { create, update, destroy, findOne, findAll, findBySearch };
