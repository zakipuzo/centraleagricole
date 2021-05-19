// Imports

// App Imports
import {
    CATEGORIES_GET_LIST_REQUEST,
    CATEGORIES_GET_LIST_RESPONSE,
    CATEGORIES_GET_LIST_FAILURE,
    CATEGORIES_GET_REQUEST,
    CATEGORIES_GET_FAILURE,
    CATEGORIES_GET_RESPONSE
} from './actions'

//CATEGORY list

// Initial State
const categoriesInitialState = {
    isLoading: false,
    error: null,
    list: []
}

const categoryInitialState = {
    isLoading: false,
    error: null,
    item: null
}

// State
export const categories = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case CATEGORIES_GET_LIST_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }


        case CATEGORIES_GET_LIST_RESPONSE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                list: action.list
            }

        case CATEGORIES_GET_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state
    }
}

export const category = (state = categoriesInitialState, action) => {
    switch (action.type) {
        case CATEGORIES_GET_REQUEST:
            return {
                ...state,
                isLoading: action.isLoading,
                error: null
            }


        case CATEGORIES_GET_RESPONSE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                item: action.item
            }

        case CATEGORIES_GET_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }

        default:
            return state
    }
}