const associate = (models) => {
  models.User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'posts' });
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', 
  {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  User.associate = associate;

  return User;
};