// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql'

// App Imports
import { UserType } from '../user/types'  
import { ProductType } from '../product/types'


const SavedProductType = new GraphQLObjectType({
  name: 'savedproduct',
  description: 'Saved Product Type',

  fields: () => ({
    id: { type: GraphQLInt },
    user: { type: UserType },  
    product: { type: ProductType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})

const savedIdsType = new GraphQLObjectType({
  name: 'savedIdsType',
  description: 'savedIdsType',

  fields: () => ({
    id: { type: GraphQLInt }, 
  })
})

const isProductSavedType = new GraphQLObjectType({
  name: 'isproductsaved',
  description: ' Is Saved Product Type',

  fields: () => ({
     exists: { type: GraphQLString }
  })
})

export  {SavedProductType, isProductSavedType, savedIdsType}