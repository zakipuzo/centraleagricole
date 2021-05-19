// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt , GraphQLInputObjectType} from 'graphql'

// App Imports
import {ProductType} from '../product/types'
import CartType from '../cart/types'

// Cart type
export const CartItemType = new GraphQLObjectType({
  name: 'cartItem',
  description: 'Cart Item Type',

  fields: () => ({
    id: { type: GraphQLInt },
    cart: { type: CartType },
    product: { type: ProductType },
    quantity: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})



// Cart type
export const CartItemIputType =  new GraphQLInputObjectType({
  name: 'cartItemInput',
  description: 'Cart Item Input Type',

  fields: () => ({
    
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },

  })
}) 