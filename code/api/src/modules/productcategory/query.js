// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { ProductCategoryType } from './types'
import { ProductType } from '../product/types'
import {get, getAll, getByCategory, getByProduct } from './resolvers'

// Subscriptions All
export const productsWithCategories = {
    type: new GraphQLList(ProductCategoryType),
    resolve: getAll
}

// Subscriptions by user
export const productsByCategory = {
    type: new GraphQLList(ProductType),
    args: {
        categoryId: { type: GraphQLInt }
    },
    resolve: getByCategory
}

// Subscriptions by user
export const categoriesByProduct = {
    type: new GraphQLList(ProductCategoryType),
    args: {
        productId: { type: GraphQLInt }
    },
    resolve: getByProduct
}

// Subscription By id
export const productCategoryById = {
    type: ProductCategoryType,
    args: {
        productId: { type: GraphQLInt },
        categoryId: { type: GraphQLInt }
    },
    resolve: get
}