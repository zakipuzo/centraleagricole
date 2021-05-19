module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('productcategories', {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER
                },
                productId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'products',
                        key: 'id'
                    },
                    allowNull: true,
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                categoryId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'categories',
                        key: 'id'
                    },
                    allowNull: true,
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
                return queryInterface.sequelize.query("ALTER TABLE productcategories ADD unique (productId, categoryId);");
            })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('productcategories');
    }
}