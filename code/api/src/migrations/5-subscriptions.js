module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('subscriptions', {
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
            crateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'crates',
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
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('subscriptions');
    }
}