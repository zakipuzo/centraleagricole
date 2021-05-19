'use strict'

// Subscription
module.exports = function(sequelize, DataTypes) {
    let ProductCategory = sequelize.define('productcategories', {

        productId: {
            type: DataTypes.INTEGER
        },
        categoryId: {
            type: DataTypes.INTEGER
        }
    })

    ProductCategory.associate = function(models) {
        ProductCategory.belongsTo(models.Product, { foreignKey: 'productId' })
        ProductCategory.belongsTo(models.Category, { foreignKey: 'categoryId' })
    }

    return ProductCategory
}