// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const CARTS_GET_LIST_REQUEST = 'CARTS/GET_LIST_REQUEST'
export const CARTS_GET_LIST_RESPONSE = 'CARTS/GET_LIST_RESPONSE'
export const CARTS_GET_LIST_FAILURE = 'CARTS/GET_LIST_FAILURE'
export const CARTS_GET_LIST_BY_USER_REQUEST = 'CARTS/GET_LIST_BY_USER_REQUEST'
export const CARTS_GET_LIST_BY_USER_RESPONSE = 'CARTS/GET_LIST_BY_USER_RESPONSE'
export const CARTS_GET_LIST_BY_USER_FAILURE = 'CARTS/GET_LIST_BY_USER_FAILURE'
export const CART_GET_REQUEST = 'CART/GET_REQUEST'
export const CART_GET_RESPONSE = 'CART/GET_RESPONSE'
export const CART_GET_FAILURE = 'CART/GET_FAILURE'

// Actions

// Get list of carts
export function getList(isLoading = true) {
  return dispatch => {
    dispatch({
      type: CARTS_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'cart',
      fields: ['id',    {'cartItems':[ {'product': ['name', 'price']}, 'quantity' ]}, 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CARTS_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.cart
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: CARTS_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}


// Get list of carts by user
export function getCartByUser(isLoading = true) {
  return dispatch => {
    dispatch({
      type: CART_GET_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'cart',
      fields: ['id',    {'cartItems':[ 'id', {'product': ['id', 'name', 'price', 'image']}, 'quantity' ]}, 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: CART_GET_RESPONSE,
            error: null,
            isLoading: false,
            item: response.data.data.cart
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: CART_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single CART
export function get(slug, isLoading = true) {
  return dispatch => {
    dispatch({
      type: CARTS_GET_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'cart',
      variables: { slug },
      fields: ['id', 'user { name, email }', 'crate { id, name, description }', 'quantity', 'createdAt']
    }))
      .then(response => {
        dispatch({
          type: CARTS_GET_RESPONSE,
          error: null,
          isLoading: false,
          item: response.data.data.cart
        })
      })
      .catch(error => {
        dispatch({
          type: CARTS_GET_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Create cart
export function addToCart(cartItem) {
  console.log("eeee"+cartItem.quantity)
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'addToCart',
      variables: {productId: cartItem.productId, quantity: cartItem.quantity},
      fields: ['id']
    }))
  }
}

// Create cart
export function saveCartItemQuantity(cartItem) {
   
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'saveCartItemQuantity',
      variables: {id: cartItem.id, quantity: cartItem.quantity},
      fields: ['id']
    }))
  }
}

// Remove cart
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'removeFromCart',
      variables,
      fields: ['id']
    }))
  }
}

// Remove cart
export function setQuantity(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'updateQuantity',
      variables,
      fields: ['id']
    }))
  }
}
