module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cart_items', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            cartId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'carts',
                    key: 'id'
                },
                allowNull: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'products',
                    key: 'id'
                },
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
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
        return queryInterface.dropTable('cart_items');
    }
}