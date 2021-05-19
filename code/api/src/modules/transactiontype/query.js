// Imports
import { GraphQLInt, GraphQLList } from 'graphql'

// App Imports
 
import { getAll } from './resolvers'
import { TransactionTypeType } from './types'

// Subscriptions All
export const transactionTypes = {
    type: new GraphQLList(TransactionTypeType),
    resolve: getAll
}

