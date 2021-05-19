'use strict'

module.exports = function(sequelize, DataTypes) {
    let Category = sequelize.define('categories', {
        name: {
            type: DataTypes.STRING
        },
        categoryId: {
            type: DataTypes.INTEGER
        },
        node: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN
        }
    })

    Category.associate = function(models) {
        Category.belongsTo(models.Category)
        Category.hasMany(models.Category, {as : "subCategories"})
        Category.hasMany(models.ProductCategory)
    }

    return Category
}