// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList, GraphQLInputObjectType, GraphQLBoolean } from 'graphql'
import { CategoryType } from '../category/types'
import { ProductCategoryType } from '../productcategory/types'
import { ProductImageType } from '../productimage/types'
import { TransactionTypeType } from '../transactiontype/types'
import { UserType, ProfileType } from '../user/types'
// Product type
const ProductType = new GraphQLObjectType({
    name: 'product',
    description: 'Product Type',

    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        slug: { type: GraphQLString },
        type: { type: GraphQLInt },
        price: { type: GraphQLFloat },
        gender: { type: GraphQLInt },
        description: { type: GraphQLString },
        user: { type: UserType },
        transactionType: { type: TransactionTypeType},
        productImages : { type : GraphQLList(ProductImageType)},
        image: { type: GraphQLString }, 
        categories: { type: GraphQLList(CategoryType) }, 
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },

    })
})

// Product type with meta
const ProductsWithMetaType = new GraphQLObjectType({
    name: 'productswithmeta',
    description: 'Productswithmeta',

    fields: () => ({
        products : { type : GraphQLList(ProductType)},
        count : { type: GraphQLInt}
    })
})



// User Gender type
const ProductTypesType = new GraphQLObjectType({
    name: 'productTypesType',
    description: 'User Types Type',

    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        
    })
})



const CategoryForProductInputType = new GraphQLInputObjectType({
    name: 'CategoryForProductInputType',
    description: 'For products category',
    fields: () => ({
        category: { type: CategoryIdInputType },
    })

})

const CategoryIdInputType = new GraphQLInputObjectType({
    name: 'CategoryIdInputType',
    description: 'For products category id',
    fields: () => ({
        id: { type: GraphQLInt },
    })

})


export {ProductsWithMetaType, ProductType, ProductTypesType, CategoryForProductInputType }