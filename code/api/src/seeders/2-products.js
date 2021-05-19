'use strict';

const params = require('../config/params');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', [{
                name: "Huile d'olive 1 L",
                slug: 'huile-d-olive',
                description: "1 L Huile d'olive",
                type: params.product.types.accessory.id,
                price: 40.00,
                gender: params.user.gender.female.id,
                image: '/images/stock/huile-olive.jpg',
                userId: 1,
                transactionTypeId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Huile d'argan 250 ml",
                slug: 'huile-argan',
                description: "250 ml Huile d'argan",
                type: params.product.types.cloth.id,
                price: 600.00,
                gender: params.user.gender.female.id,
                image: '/images/stock/huile-argan.jpg',
                userId: 1,
                transactionTypeId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Croquettes MASTER',
                slug: 'croquette-master',
                description: 'Croquette délicieuse pour chien',
                type: params.product.types.accessory.id,
                price: 39.99,
                gender: params.user.gender.male.id,
                image: '/images/stock/croquettes-master.jpg',
                userId: 1,
                transactionTypeId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Chiens berger',
                slug: 'chiens-berger',
                description: 'Berger de rase berger alement',
                type: params.product.types.accessory.id,
                price: 2000.00,
                gender: params.user.gender.female.id,
                image: '/images/stock/chien-berger.jpg',
                userId: 1,
                transactionTypeId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Pompes Doseuses et Fertiliseurs',
                slug: 'pompes-doseuses-et-fertiliseurs',
                description: "Filtres plastiques pour l'agriculture, pour traitement de l'eau d'arrosage et d'irrigation",
                type: params.product.types.accessory.id,
                price: 50.00,
                gender: params.user.gender.male.id,
                image: '/images/stock/Filtres-plastiques.jpg',
                userId: 1,
                transactionTypeId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },

            {
                name: "Miel Argan 500g",
                slug: 'miel-argan-500g',
                description: 'Miel argan unique gout',
                type: params.product.types.cloth.id,
                price: 320.00,
                gender: params.user.gender.female.id,
                image: '/images/stock/miel-argan.jpg',
                userId: 1,
                transactionTypeId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Miel Orange 500g',
                slug: 'miel-orange-500g',
                description: "Miel d'orange très délicieuse",
                type: params.product.types.cloth.id,
                price: 300.00,
                gender: params.user.gender.male.id,
                image: '/images/stock/miel-orange.jpg',
                userId: 1,
                transactionTypeId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Miel Montagne',
                slug: 'miel montagne',
                description: "Miel de montagne d'atlas",
                type: params.product.types.cloth.id,
                price: 220.00,
                gender: params.user.gender.male.id,
                image: '/images/stock/miel-montagne.jpg',
                userId: 1,
                transactionTypeId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ])
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
}