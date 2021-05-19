// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt , GraphQLInputObjectType, GraphQLBoolean} from 'graphql'

// App Imports
import {ProductType} from '../product/types' 
// Cart type
export const ProductImageType = new GraphQLObjectType({
  name: 'productimagetype',
  description: 'Product Image Type',

  fields: () => ({
    id: { type: GraphQLInt },
    product: { type: ProductType },
    image: { type: GraphQLString },
    isMain: { type: GraphQLBoolean },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})



 