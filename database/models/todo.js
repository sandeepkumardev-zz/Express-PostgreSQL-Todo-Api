"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return { ...this.get(), userId: undefined };
    }
  }
  Todo.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { message: "Should not be Empty" },
        },
      },
      isCompleted: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
