module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    // eslint-disable-next-line camelcase
    serving_qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [1]
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
    // eslint-disable-next-line camelcase
    consumed_at: {
      type: DataTypes.DATE,
      allowNull: false,
      len: [1]
    }
  });

  Food.associate = function(models) {
    // We're saying that a Food should belong to an User
    // A Food can't be created without an User due to the foreign key constraint
    Food.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Food;
};
