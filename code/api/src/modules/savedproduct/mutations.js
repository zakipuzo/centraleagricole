// Imports
import { GraphQLInt } from 'graphql'

 
import { addOrRemoveSavedProduct } from './resolvers'
import {SavedProductType} from './types'
 
 
export const addremoveSavedProduct = {
  type: SavedProductType,
  args: {
  
    productId: {
      name: 'productId',
      type: GraphQLInt
    },
 
  },
  resolve: addOrRemoveSavedProduct
}
 