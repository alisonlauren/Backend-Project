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
   await queryInterface.bulkInsert('Challenges', [
      {
        is_public: true,
        type: 'Cycling',
        criteria: '{"title": "1000 Miles in October", "description":"Complete 1000 miles cycling in October", "distance": "1000"}',
        is_completed: false,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        is_public: true,
        type: 'Running',
        criteria: '{"title": "500 Miles in October", "description":"Complete 500 miles running in October", "distance": "500"}',
        is_completed: false,
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
    return queryInterface.bulkDelete('Challenges', null, {});
  }
};
