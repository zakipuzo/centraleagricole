'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('productcategories', [{
                productId: 1,
                categoryId: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 2,
                categoryId: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 3,
                categoryId: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 4,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 5,
                categoryId: 12,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 6,
                categoryId: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 7,
                categoryId: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                productId: 8,
                categoryId: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            }


        ], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
}