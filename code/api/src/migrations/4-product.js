module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            transactionTypeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'transaction_types',
                    key: 'id'
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            name: {
                type: Sequelize.STRING
            },
            slug: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.DECIMAL(10, 2)
            },
            description: {
                type: Sequelize.TEXT
            },
            type: {
                type: Sequelize.INTEGER
            }, 
            gender: {
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('products');
    }
}