'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
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
    // add method for password validation
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        is: /^[a-z0-9\s]+$/i
      }
    },
    lastName: {
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
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, 10));
        this.setDataValue('password_raw', value);
      }
    },
    password_raw: {
      type: DataTypes.VIRTUAL,
      validate: {
        isLongEnough: function (value) {
          if (value.length < 8) {
            throw new Error("Please choose a longer password")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  });
  return User;
};
