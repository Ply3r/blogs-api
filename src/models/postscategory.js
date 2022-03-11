const associate = (models) => {
  models.BlogPost.belongsToMany(models.Category, {
    as: 'categories',
    through: 'PostsCategory',
    foreignKey: 'postId', 
    otherKey: 'categoryId',
  });

  models.Category.belongsToMany(models.BlogPost, {
    as: 'posts',
    through: 'PostsCategory',
    foreignKey: 'categoryId', 
    otherKey: 'postId',
  });
};

module.exports = (sequelize, _DataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', 
  {

  }, {
    timestamps: false,
  });

  PostsCategory.associate = associate;

  return PostsCategory;
};