// Imports
import { GraphQLObjectType } from 'graphql'

// App Imports
import * as user from '../../modules/user/query'
import * as product from '../../modules/product/query'
import * as crate from '../../modules/crate/query'
import * as subscription from '../../modules/subscription/query'
import * as category from '../../modules/category/query'
import * as productcategory from '../../modules/productcategory/query'
import * as cart from '../../modules/cart/query'
import * as transactionType from '../../modules/transactiontype/query'
import * as savedProduct from '../../modules/savedproduct/query'
import * as message from '../../modules/message/query'

// Query
const query = new GraphQLObjectType({
    name: 'query',
    description: 'API Queries [Read]',

    fields: () => ({
        ...user,
        ...product,
        ...crate,
        ...subscription,
        ...category,
        ...productcategory,
        ...cart,
        ...transactionType,
        ...savedProduct,
        ...message
    })
})

export default query