// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt , GraphQLInputObjectType} from 'graphql'

// App Imports
import {ProductType} from '../product/types'
import CartType from '../cart/types'

// Cart type
export const TransactionTypeType = new GraphQLObjectType({
  name: 'transactionTypeType',
  description: 'transaction type Type',

  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }, 
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