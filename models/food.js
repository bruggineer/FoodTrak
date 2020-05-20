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
  return Food;
};
