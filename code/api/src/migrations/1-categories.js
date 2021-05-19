module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
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
            node: {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '0'
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
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
        return queryInterface.dropTable('categories');
    }
}