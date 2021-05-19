 module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transaction_types', [
      {
        name: 'Offer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Demand',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transaction_types', null, {});
  }
}
