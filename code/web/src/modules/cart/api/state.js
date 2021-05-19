// Imports

// App Imports
import {
 CART_GET_FAILURE,
 CART_GET_REQUEST,
 CART_GET_RESPONSE,
 CARTS_GET_LIST_BY_USER_FAILURE,
 CARTS_GET_LIST_BY_USER_REQUEST,
 CARTS_GET_LIST_BY_USER_RESPONSE,
 CARTS_GET_LIST_FAILURE,
 CARTS_GET_LIST_REQUEST,
 CARTS_GET_LIST_RESPONSE,
} from './actions'

// Carts list

// Initial State
const cartsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const carts = (state = cartsInitialState, action) => {
  switch (action.type) {
    case CARTS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case CARTS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case CARTS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// CARTs list by user
 
// Single cart

// Initial State
const cartInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const cart = (state = cartInitialState, action) => {
  switch (action.type) {
    case CART_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case CART_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case CART_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}