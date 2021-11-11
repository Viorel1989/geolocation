'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstname:{
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z0-9\s]+$/i
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z0-9\s]+$/i
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};
