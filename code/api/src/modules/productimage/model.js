'use strict'

// prod image
module.exports = function (sequelize, DataTypes) {
  let ProductImage = sequelize.define('product_images', {


    productId: {
      type: DataTypes.INTEGER

    },
    image: {
      type: DataTypes.TEXT
    },
    isMain: {
      type: DataTypes.BOOLEAN,
    },

  })

  ProductImage.associate = function (models) {
    ProductImage.belongsTo(models.Product)
   }

  return ProductImage
}

