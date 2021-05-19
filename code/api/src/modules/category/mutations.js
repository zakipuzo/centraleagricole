// Imports
import { GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import { CategoryType } from './types'
import { create, remove, update } from './resolvers'

// Category create
export const categoryCreate = {
    type: CategoryType,
    args: {
        name: {
            name: 'name',
            type: GraphQLString
        },

        categoryId: {
            name: 'categoryId',
            type: GraphQLInt
        },

        isActive: {
            name: 'isActive',
            type: GraphQLBoolean
        }

    },
    resolve: create
}

// Category update
export const categoryUpdate = {
    type: CategoryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },

        name: {
            name: 'name',
            type: GraphQLString
        },

        categoryId: {
            name: 'categoryId',
            type: GraphQLInt
        }
        ,
        isActive: {
            name: 'isActive',
            type: GraphQLBoolean
        }

    },
    resolve: update
}

// Category remove
export const categoryRemove = {
    type: CategoryType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}