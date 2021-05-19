// Imports
import {GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType, GraphQLBoolean } from 'graphql'


// Category type
const CategoryType = new GraphQLObjectType({
    name: 'category',
    description: 'CategoryWithParentObjectType',

    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        node: { type: GraphQLString },
        isActive: { type: GraphQLBoolean},
        category: { type: CategoryType },
        subCategories: { type: GraphQLList(CategoryType) },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
})


// Category just parent id type
const CategoryParentIdType = new GraphQLObjectType({
    name: 'CategoryWithParentId',
    description: 'category just with parent Id',

    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        node: { type: GraphQLString },
        categoryId: { type: GraphQLInt }

    })
})

const CategoryInputType = new GraphQLInputObjectType({
    name: 'CategoryInputType',
    description: 'category just with parent Id',

    fields: () => ({
        id: { type: GraphQLInt }

    })
})

export { CategoryType, CategoryParentIdType, CategoryInputType }