'use strict'

// Product
module.exports = function(sequelize, DataTypes) {
    let Product = sequelize.define('products', {
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL(10, 2)
        },
        type: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.TEXT
        }
        ,
        userId: {
            type: DataTypes.INTEGER
        },
        transactionTypeId: {
            type: DataTypes.INTEGER
        },
    })
    Product.associate = function(models) {
        Product.belongsToMany(models.Category, { through: models.ProductCategory })
        Product.hasMany(models.CartItem)
        Product.hasMany(models.ProductImage, {as : 'productImages'})
        Product.belongsTo(models.User, {as : 'user'})
        Product.belongsTo(models.TransactionType ,{ as : 'transactionType'})
        Product.hasMany(models.SavedProduct, {as : "savedProducts" })
      
    }



    return Product
}