module.exports = function(sequelize, DataTypes) {
  var UsersFood = sequelize.define("UsersFood", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });
  UsersFood.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    UsersFood.belongsTo(models.User);
    UsersFood.belongsTo(models.Food);
  };
  return UsersFood;
};
