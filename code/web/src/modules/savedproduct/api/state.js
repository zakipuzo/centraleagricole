// Imports

// App Imports
import {
  SAVEDPRODUCTS_GET_LIST_REQUEST,
  SAVEDPRODUCTS_GET_LIST_RESPONSE,
  SAVEDPRODUCTS_GET_LIST_FAILURE, 
} from './actions'

// SAVEDPRODUCTS list

// Initial State
const savedProductsInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const savedProducts = (state = savedProductsInitialState, action) => {
  switch (action.type) {
    case SAVEDPRODUCTS_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case SAVEDPRODUCTS_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case SAVEDPRODUCTS_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

 