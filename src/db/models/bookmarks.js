"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(bookmarks, {
        foreignKey: "id",
      });
    }
  }
  bookmarks.init(
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
          is: /^[a-z0-9\s]+$/i,
        },
      },
      address: {
        type: DataTypes.STRING,
        validate: {
          is: /^[a-z0-9\s]+$/i,
        },
      },
    },
    {
      sequelize,
      modelName: "bookmarks",
    }
  );
  return bookmarks;
};
