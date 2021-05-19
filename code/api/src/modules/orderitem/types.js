// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLInputObjectType } from 'graphql'
import { OrderType } from '../deliveryadresse/types'
import { ProductType } from '../product/types'
// Product type
export  const orderItemType = new GraphQLObjectType({
    name: 'orderItem',
    description: 'Order Item Type',

    fields: () => ({
        id: { type: GraphQLInt },
        cart: {type : CartType },
        order: { type: OrderType },
        product: { type: ProductType },
        quantity: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
})

export  const orderItemInputType = new GraphQLInputObjectType({
    name: 'orderItemInput',
    description: 'Order Item Input Type',

    fields: () => ({
         
        productId: { type: GraphQLInt },
        quantity: { type: GraphQLInt },
     
    })
})


 