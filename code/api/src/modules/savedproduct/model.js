'use strict'

 
module.exports = function(sequelize, DataTypes) {
  let SavedProduct = sequelize.define('saved_products', {
 
    userId: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER
    },
  })

  SavedProduct.associate = function(models) {
    SavedProduct.belongsTo(models.User , { foreignKey: 'userId' })
    SavedProduct.belongsTo(models.Product , { foreignKey: 'productId' })
  }

  return SavedProduct
}