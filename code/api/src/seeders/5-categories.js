'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('categories', [{
                name: 'Animaux',
                node: '1',
                createdAt: new Date(),
                updatedAt: new Date()


            },
            {
                name: 'Alimentation',
                node: '2',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Matériel Agricole',
                node: '3',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                name: 'Chiens',
                node: '1.4',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 1
            },
            {
                name: 'Nouriture chiens',
                node: '1.4.5',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 4,
                isActive: true
            },
            {
                name: 'Abeilles',
                node: '1.6',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 1
            },
            {
                name: 'Ruches',
                node: '1.6.7',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 6
            },

            {
                name: 'Huiles',
                node: '2.8',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2
            },
            {
                name: 'Miels',
                node: '2.9',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2
            },
            {
                name: 'Legumes',
                node: '2.10',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2
            },
            {
                name: 'Fruits',
                node: '2.11',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 2
            },
            {
                name: 'Irrigation, fertilisation ',
                node: '3.12',
                createdAt: new Date(),
                updatedAt: new Date(),
                categoryId: 3
            }
        ], {})
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
}