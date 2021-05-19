// App Imports
import models from '../../setup/models'
 
// Get cart by user
export async function getByUser(parentValue, { },{auth}) {
  if (auth.user && auth.user.id > 0) {
 
    return await models.Cart.findOne({
    
      include: {
        model: models.CartItem,
        as: "cartItems",
        include: [
          { model: models.Product, }
        ]
      }
    })
  } else {
    throw new Error('Please login to view your cart.')
  }
}

// Get all carts
export async function getAll() {
  return await models.Cart.findAll({
    
    include: [
      {
      model: models.CartItem,
      as: "cartItems",
      include: models.Product
      },
      {
        model: models.User
      }
  
  ]
  })
}

// add to cart
export async function addItemsToCart(parentValue, { productId, quantity }, {auth}) {
  if (auth.user && auth.user.id > 0) {

    console.log("hhhh"+quantity)

    //check quantity
    if (quantity == null || quantity < 1)
      quantity = 1

    //check if user has cart
    await models.Cart.findOne(
      {
        where: {
          userId: auth.user.id

        },

        include: {
          model: models.CartItem,
          as: "cartItems"
        }

      }).then(cart => {
        // if cart found
        if (cart) {

          // we check if product exit
          var productExist = false;
          var qty=1;
          cart.cartItems.forEach((item) => {
            if (item.productId == productId) {
              productExist = true;
              qty=item.quantity
            }
          })

          //if product exist then we update quantity
          if (productExist) {
            return models.CartItem.update({
              quantity: qty+quantity,

            },
              {
                where: {
                  cartId: cart.id,
                  productId
                }
              }
            )
          }
          // if product doest exist in the cart we create a new 
          else {

            models.CartItem.create({
              cartId: cart.id,
              productId,
              quantity
            })

          }

          console.log(productExist)
        }

        // if cart doest exit
        else {
          // create a cart for the user
          models.Cart.create({
            userId: auth.user.id

          }).then(cart => {
            // add items to cart
            models.CartItem.create({
              cartId: cart.id,
              productId: productId,
              quantity
            })

          });

        }

      })

    return await models.Cart.findOne({
      where: {
        userId: auth.user.id
      },
      include: {
        model: models.CartItem,
        as: "cartItems",
        include: [
          { model: models.Product, }

        ]
      }
    })

  } else {
    throw new Error('Please login to add product to cart.')
  }
}
// Delete cart
export async function removeItem(parentValue, {productId }, { auth }) {
  
  if (auth.user && auth.user.id > 0) {
    //check if user has cart
    await models.Cart.findOne(
      {
        where: {
          userId: auth.user.id

        },

        include: {
          model: models.CartItem,
          as: "cartItems"
        }

      }).then(cart => {
        // if cart found
        if (cart) {
             // we check if product exit
             var productExist = false;
             cart.cartItems.forEach((item) => {
               if (item.productId == productId) {
                 productExist = true;
               }
             })
   
             //if product exist then we update quantity
             if (productExist) {
               return models.CartItem.destroy({
                  
                   where: {
                     cartId: cart.id,
                     productId
                   }
                 }
               )
             }
        }
      })

      return await models.Cart.findOne({
        where: {
         userId: auth.user.id
        },
        include: {
          model: models.CartItem,
          as: "cartItems",
          include: [
            { model: models.Product, }
  
          ]
        }
      })
  } else {
    throw new Error('Access denied.')
  }
}
 



// add to cart
export async function saveQuantity(parentValue, { id, quantity }, {auth}) {
  if (auth.user && auth.user.id > 0) {
 
    //check quantity
    if (quantity == null || quantity < 1)
      quantity = 1

    //check if user has cart
    await models.CartItem.update(
      {
          quantity
      },
      {
        where: {
          id
        },
      })

    return await models.CartItem.findOne({
      where: {
       id
      },
      
    })

  } else {
    throw new Error('Please login to add product to cart.')
  }
}




// Delete product from
export async function removeProductsFromCart(parentValue, {  }, { auth }) {
  if (auth.user && auth.user.id > 0) {
    return await models.Cart.destroy({ where: {  userId: auth.user.id } })
  } else {
    throw new Error('Access denied.')
  }
}
 