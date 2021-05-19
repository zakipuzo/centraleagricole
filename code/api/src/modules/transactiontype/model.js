'use strict'

// cart
module.exports = function(sequelize, DataTypes) {
  let TransactionType = sequelize.define('transaction_types', {
    name: {
      type: DataTypes.STRING
    } 
  })

  TransactionType.associate = function(models) {
    TransactionType.hasMany(models.Product) 
  }

  return TransactionType
}