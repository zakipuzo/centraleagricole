// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import CartType from './types'
import { addItemsToCart, removeItem, removeProductsFromCart, saveQuantity } from './resolvers'
import { CategoryInputType } from '../category/types'
import { CartItemType } from '../cartitems/types'

// cart create
export const addToCart = {
  type: CartType,
  args: {
  
    productId: {
      name: 'productId',
      type: GraphQLInt
    },
    quantity: {
      name: 'quantity',
      type: GraphQLInt
    },
  },
  resolve: addItemsToCart
}

// Cart remove
export const removeFromCart = {
  type: CartType,
  args: {
  
    productId: {
      name: 'productId',
      type: GraphQLInt
    }
  },
  resolve: removeItem
}


//  remove product from cart
export const CartRemove = {
  type: CartType,
  
  resolve: removeProductsFromCart
}

 // save cart quantities
export const saveCartItemQuantity = {
  type: CartItemType,
  args: {
  
    id: {
      name: 'id',
      type: GraphQLInt
    },
    quantity: {
      name: 'quantity',
      type: GraphQLInt
    },
  },
  resolve: saveQuantity
}