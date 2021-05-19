module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('notifications', {
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
            description: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            isSeen: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            }, 
            url: {
                type: Sequelize.TEXT, 
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
        return queryInterface.dropTable('notifications');
    }
}