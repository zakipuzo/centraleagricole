// Imports
import { GraphQLString, GraphQLInt, GraphQLFloat, GraphQLList } from 'graphql'

// App Imports
import { ProductType, CategoryForProductInputType } from './types'
// App Imports
import { ProductCategoryInputType } from '../productcategory/types'


import { create, update, remove, userNewProduct, userRemoveProduct, userUpdateProduct } from './resolvers'

// Product create
export const productCreate = {
    type: ProductType,
    args: {

        name: {
            name: 'name',
            type: GraphQLString
        },
        slug: {
            name: 'slug',
            type: GraphQLString
        },
        description: {
            name: 'description',
            type: GraphQLString
        },
        type: {
            name: 'type',
            type: GraphQLInt
        },
        price: {
            name: 'price',
            type: GraphQLString
        },
        categoriesIds: {
            name: 'categoriesIds',
            type: GraphQLString
        },

        gender: {
            name: 'gender',
            type: GraphQLInt
        },

        transactionType: {
            name: 'transactionType',
            type: GraphQLInt
        },
        image: {
            name: 'image',
            type: GraphQLString
        },
        productImages: {
            name: 'productImages',
            type: GraphQLString
        }
    },
    resolve: create
}

// Product update
export const productUpdate = {
    type: ProductType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },

        name: {
            name: 'name',
            type: GraphQLString
        },

        slug: {
            name: 'slug',
            type: GraphQLString
        },

        description: {
            name: 'description',
            type: GraphQLString
        },
        categoriesIds: {
            name: 'categoriesIds',
            type: GraphQLString
        },
        type: {
            name: 'type',
            type: GraphQLInt
        },
        price: {
            name: 'type',
            type: GraphQLString
        },
        gender: {
            name: 'gender',
            type: GraphQLInt
        },

        transactionType: {
            name: 'transactionType',
            type: GraphQLInt
        },
        image: {
            name: 'image',
            type: GraphQLString
        },
        productImages: {
            name: 'productImages',
            type: GraphQLString
        }
    },
    resolve: update
}

// Product remove
export const productRemove = {
    type: ProductType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}


/// FOR CLIENTS 
// Product create
export const UserProductCreate = {
    type: ProductType,
    args: {

        name: {
            name: 'name',
            type: GraphQLString
        },
        slug: {
            name: 'slug',
            type: GraphQLString
        },
        description: {
            name: 'description',
            type: GraphQLString
        },
        type: {
            name: 'type',
            type: GraphQLInt
        },
        price: {
            name: 'price',
            type: GraphQLString
        },

        transactionType: {
            name: 'transactionType',
            type: GraphQLInt
        },

        categoriesIds: {
            name: 'categoriesIds',
            type: GraphQLString
        },

        gender: {
            name: 'gender',
            type: GraphQLInt
        },

        transactionTypeId: {
            name: 'transactionType',
            type: GraphQLInt
        },
        image: {
            name: 'image',
            type: GraphQLString
        }
    },
    resolve: userNewProduct
}

// Product update
export const UserProductUpdate = {
    type: ProductType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },

        name: {
            name: 'name',
            type: GraphQLString
        },

        slug: {
            name: 'slug',
            type: GraphQLString
        },


        transactionType: {
            name: 'transactionType',
            type: GraphQLInt
        },
        
        description: {
            name: 'description',
            type: GraphQLString
        },
        categoriesIds: {
            name: 'categoriesIds',
            type: GraphQLString
        },
        type: {
            name: 'type',
            type: GraphQLInt
        },
        price: {
            name: 'type',
            type: GraphQLString
        },
        gender: {
            name: 'gender',
            type: GraphQLInt
        },

        image: {
            name: 'image',
            type: GraphQLString
        }
    },
    resolve: userUpdateProduct
}

// Product remove
export const UserProductRemove = {
    type: ProductType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: userRemoveProduct
}