'use strict';
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return models.User.bulkCreate([{
      firstName: 'John',
      lastName: 'Doe',
      email: 'exampe@example.com',
      password: 'passsdsddd'
    }], {validate: true});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
