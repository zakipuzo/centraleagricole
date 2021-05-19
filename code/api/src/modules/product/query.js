// Imports
import { GraphQLString, GraphQLInt, GraphQLList } from 'graphql'

// App Imports
import { ProductType, ProductTypesType, ProductsWithMetaType } from './types'
import { showMore , singleUserProducts, getAll, getProductById, getById, getRelated, getTypes, findProduct, getAllOffers, getAllDemands } from './resolvers'

// Products All
export const products = {
    type: new GraphQLList(ProductType),
    args: {
        transactionType : { type: GraphQLInt},
        limit : { type: GraphQLInt}
    },
    resolve: getAll
}


// Products All Offers
export const offerProducts = {
    type: new GraphQLList(ProductType),
    resolve: getAllOffers
}

// Products All Demand
export const demandProducts = {
    type: new GraphQLList(ProductType),
    resolve: getAllDemands
}




// Products All
export const showMoreProducts = {
    type: new GraphQLList(ProductType),
    args: {
        productId: { type: GraphQLInt },
        transactionType : { type: GraphQLInt}
    },
    resolve: showMore
}



// Products All
export const userProducts = {
    type: new GraphQLList(ProductType),
    args: {
        id: { type: GraphQLInt }
    },
    resolve: singleUserProducts
}


// Product By slug
export const product = {
    type: ProductType,
    args: {
        id: { type: GraphQLInt}
    },
    resolve: getProductById
}

// Product By ID
export const productById = {
    type: ProductType,
    args: {
        productId: { type: GraphQLInt }
    },
    resolve: getById
}

// Products Related
export const productsRelated = {
    type: new GraphQLList(ProductType),
    args: {
        productId: { type: GraphQLInt }
    },
    resolve: getRelated
}

// Product Types
export const productTypes = {
    type: new GraphQLList(ProductTypesType),
    resolve: getTypes
}
 
 
//Search Product
export const searchProduct ={
    type : ProductsWithMetaType,
    args: {
        search: { type: GraphQLString },
        categoryId: {type: GraphQLInt},
        transactionType:  {type: GraphQLInt},
    },
    resolve : findProduct
}