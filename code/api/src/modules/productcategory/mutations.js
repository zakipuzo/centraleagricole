// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { ProductCategoryType } from './types'
import { create, remove, update } from './resolvers'

// ProductCategory create
export const ProductCategoryCreate = {
    type: ProductCategoryType,
    args: {
        productId: {
            name: 'productId',
            type: GraphQLInt
        },
        categoryIds: {
            name: 'categoryIds',
            type: GraphQLList(GraphQLInt)
        }
    },
    resolve: create
}


// ProductCategory remove
export const ProductCategoryRemove = {
    type: ProductCategoryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}