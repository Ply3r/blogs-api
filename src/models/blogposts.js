const associate = (models) => {
  models.BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
};

module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', 
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),
    },
  }, {
    timestamps: false,
  });

  BlogPost.associate = associate;

  return BlogPost;
};