module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    carbs: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    calories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    protein: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    sugars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    // eslint-disable-next-line camelcase
    total_fat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
    },
    // eslint-disable-next-line camelcase
    consumed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Food.associate = function(models) {
    // Associating User with Posts
    // When an User is deleted, also delete any associated Posts
    // Food.belongsToMany(models.User, {
    //   through: models.UsersFood,
    //   uniqueKey: "id"
    // });
  };
  return Food;
};
