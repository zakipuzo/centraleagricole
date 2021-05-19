// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import { CategoryType, CategoryParentIdType } from './types'
import { getAll, getAllGeneral, getById, getSubcats, getSimpleCategoryById } from './resolvers'

// Categories All
export const categories = {
    type: new GraphQLList(CategoryType),
    resolve: getAll
}

export const generalCategories = {
    type: new GraphQLList(CategoryType),
    resolve: getAllGeneral
}

// category By ID
export const categoryById = {
    type: CategoryType,
    args: {
        categoryId: { type: GraphQLInt }
    },
    resolve: getById
}

// Category By ID
export const simpleCategoryById = {
    type: CategoryType,
    args: {
        id: { type: GraphQLInt }
    },
    resolve: getSimpleCategoryById
}

//Subcategories
export const getSubCategories = {
    type: new GraphQLList(CategoryType),
    args: {
        categoryId: { type: GraphQLInt }
    },
    resolve: getSubcats
}

 
