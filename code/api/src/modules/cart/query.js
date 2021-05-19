// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import CartType from './types'
import { getAll, getByUser, get } from './resolvers'

// Carts All
export const carts = {
  type: new GraphQLList(CartType),
  resolve: getAll
}
 

// Cart By id
export const cart = {
  type: CartType,
   
  resolve: getByUser
}

 