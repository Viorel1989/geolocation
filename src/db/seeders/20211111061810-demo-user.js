'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.User.bulkCreate([{
      firstName: 'John',
      lastName: 'Doe',
      email: 'examp@example.com',
      password: 'passdzzdsd'
    }], {validate: true});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
