module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('carts', {
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
            return queryInterface.sequelize.query("ALTER TABLE carts ADD unique (userId);");
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('carts');
    }
}