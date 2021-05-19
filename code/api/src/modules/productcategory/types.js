// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLInputObjectType } from 'graphql'

// App Imports
import { ProductType } from '../product/types'
import { CategoryType, CategoryInputType } from '../category/types'

// Subscription type
const ProductCategoryType = new GraphQLObjectType({
    name: 'productcategory',
    description: 'Product Category Type',

    fields: () => ({
        id: { type: GraphQLInt },
        product: { type: ProductType },
        category: { type: CategoryType },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
})
const ProductCategoryInputType = new GraphQLInputObjectType({
    name: 'ProductCategoryInputType',
    description: 'Product Category Type',

    fields: () => ({
        category: { type: CategoryInputType }
    })
})

export { ProductCategoryType, ProductCategoryInputType }