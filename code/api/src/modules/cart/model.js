'use strict'

// cart
module.exports = function(sequelize, DataTypes) {
  let Cart = sequelize.define('carts', {
    userId: {
      type: DataTypes.INTEGER
    },
  })

  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.hasMany(models.CartItem, {as : "cartItems"}) 
  }

  return Cart
}