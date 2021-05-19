// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const SAVEDPRODUCTS_GET_LIST_REQUEST = 'SAVEDPRODUCTS/GET_LIST_REQUEST'
export const SAVEDPRODUCTS_GET_LIST_RESPONSE = 'SAVEDPRODUCTS/GET_LIST_RESPONSE'
export const SAVEDPRODUCTS_GET_LIST_FAILURE = 'SAVEDPRODUCTS/GET_LIST_FAILURE' 

// Actions

// Get list of SAVEDPRODUCTS
export function getList( isLoading = true) {
  return dispatch => {
    dispatch({
      type: SAVEDPRODUCTS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'savedProducts', 
      fields: ['id',  {'product' : ['id', 'name', 'price', 'slug',  'description', 'image', {'user': ['id', 'name']}, {'transactionType': ['id', 'name']}]}, 'createdAt', 'updatedAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: SAVEDPRODUCTS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.savedProducts
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: SAVEDPRODUCTS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}


// Get product types
export function getSavedProducts() {
  return dispatch => {
      dispatch({
          type: SAVEDPRODUCTS_GET_LIST_RESPONSE,
          error: null,
          isLoading: false
      })
      return axios.post(routeApi, query({
          operation: 'userSavedProducts',
          fields: ['id', 'name', 'price', 'slug',  'description', 'image', {'user': ['id', 'name']}, {'transactionType': ['id', 'name']}],
        }))
      
  }
}


// Create crate
export function saveProduct(productId) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'addremoveSavedProduct',
      variables: {productId},
      fields: ['id']
    }))
  }
}

// check if product saved by user
export function isSaved(productId) {
  return dispatch => {
      return axios.post(routeApi, query({
          operation: 'isProductSaved',
          variables: {productId: parseInt(productId)},
          fields: ['id']
      }))
  }
}
