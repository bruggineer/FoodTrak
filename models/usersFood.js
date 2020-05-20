module.exports = function(sequelize, DataTypes) {
  var UsersFood = sequelize.define("UsersFood", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });
  UsersFood.associate = function(models) {
    UsersFood.belongsTo(models.User);
    UsersFood.belongsTo(models.Food);
  };
  return UsersFood;
};
