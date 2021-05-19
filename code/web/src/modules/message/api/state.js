// Imports

// App Imports
import {
  MESSAGES_GET_LIST_REQUEST,
  MESSAGES_GET_LIST_RESPONSE,
  MESSAGES_GET_LIST_FAILURE,
  MESSAGES_GET_REQUEST,
  MESSAGES_GET_RESPONSE,
  MESSAGES_GET_FAILURE,
} from './actions'

// MESSAGES list

// Initial State
const messagesInitialState = {
  isLoading: false,
  error: null,
  list: []
}

// State
export const messages = (state = messagesInitialState, action) => {
  switch (action.type) {
    case MESSAGES_GET_LIST_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case MESSAGES_GET_LIST_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        list: action.list
      }

    case MESSAGES_GET_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}

// Single message

// Initial State
const messageInitialState = {
  isLoading: false,
  error: null,
  item: {}
}

// State
export const message = (state = messageInitialState, action) => {
  switch (action.type) {
    case MESSAGES_GET_REQUEST:
      return {
        ...state,
        isLoading: action.isLoading,
        error: null
      }

    case MESSAGES_GET_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        item: action.item
      }

    case MESSAGES_GET_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      }

    default:
      return state
  }
}