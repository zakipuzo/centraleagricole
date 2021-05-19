module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('saved_products', {
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
                allowNull: false,
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
        .then(() => {
            return queryInterface.sequelize.query("ALTER TABLE saved_products ADD unique (userId, productId);");
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('saved_products');
    }
}