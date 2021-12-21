"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {}
  }
  Bookmark.init(
    {
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        validate: {
          is: /^[0-9]+$/,
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          is: /^[\p{L}0-9\s]+$/iu,
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          is: /^[\p{L}0-9\s,+]+$/iu,
        },
      },
    },
    {
      sequelize,
      modelName: "Bookmark",
      tableName: "bookmarks",
    }
  );
  return Bookmark;
};
