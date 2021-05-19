'use strict'

// cart
module.exports = function(sequelize, DataTypes) {
  let CartItem = sequelize.define('cart_items', {
    cartId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  })

  CartItem.associate = function(models) {
    CartItem.belongsTo(models.Cart)
    CartItem.belongsTo(models.Product)
  }

  return CartItem
}