// Imports
import { GraphQLBoolean, GraphQLInt, GraphQLList } from 'graphql'
import { ProductType } from '../product/types'

// App Imports
 
import { getAll, checkProductSaved , savedprod } from './resolvers'
import {SavedProductType, savedIdsType, isProductSavedType} from './types'

 
export const savedProducts = {
  type: new GraphQLList(SavedProductType),
  resolve: getAll
}

export const isProductSaved = {
  type: SavedProductType,
  args : {
    productId: { type: GraphQLInt }
  },
  resolve: checkProductSaved
}

 

export const userSavedProducts = {
  type: new GraphQLList(ProductType),
  args : {
    productId: { type: GraphQLInt }
  },
  resolve: savedprod
}

 