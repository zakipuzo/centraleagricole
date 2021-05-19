// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/mutations'
import * as product from '../../modules/product/mutations'
import * as crate from '../../modules/crate/mutations'
import * as subscription from '../../modules/subscription/mutations'
import * as category from '../../modules/category/mutations'
import * as productcategory from '../../modules/productcategory/mutations'
import * as cart from '../../modules/cart/mutations'
import * as savedProduct from '../../modules/savedproduct/mutations' 
import * as message from '../../modules/message/mutations' 
// Mutation
const mutation = new GraphQLObjectType({
    name: 'mutations',
    description: 'API Mutations [Create, Update, Delete]',

    fields: {
        ...user,
        ...product,
        ...crate,
        ...subscription,
        ...category,
        ...productcategory,
        ...cart,
        ...savedProduct,
        ...message
    }
})

export default mutation