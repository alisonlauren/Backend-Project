'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        name: 'test',
        email: 'Test@test.com',
        password: '$2b$10$n9O3Ayv8JBcAjOsmI17ajOZgt08HNoSsgtYu4UlE.IzxY20ajC88u',
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        name: 'test',
        email: 'Test2@test.com',
        password: '$2b$10$kWBJYTtTGNvHYY307CuJt.9VCpugrSs2t54r49Vv0KdpyjOECUumK',
        createdAt: new Date,
        updatedAt: new Date
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
