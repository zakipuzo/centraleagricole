// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { UserType } from '../user/types' 
import {CartItemType} from '../cartitems/types'

// Cart type
const CartType = new GraphQLObjectType({
  name: 'cart',
  description: 'Cart Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },  
    cartItems: {type: GraphQLList(CartItemType)},
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

export default CartType