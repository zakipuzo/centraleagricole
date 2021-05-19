module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product_images', {
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
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            image: {
                type: Sequelize.TEXT
            },
            isMain: {
                type: Sequelize.BOOLEAN,
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
        })
       
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('product_images');
    }
}