// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const CATEGORIES_GET_LIST_REQUEST = 'CATEGORIES/GET_LIST_REQUEST'
export const CATEGORIES_GET_LIST_RESPONSE = 'CATEGORIES/GET_LIST_RESPONSE'
export const CATEGORIES_GET_LIST_FAILURE = 'CATEGORIES/GET_LIST_FAILURE'
export const CATEGORIES_GET_REQUEST = 'CATEGORIES/GET_REQUEST'
export const CATEGORIES_GET_RESPONSE = 'CATEGORIES/GET_RESPONSE'
export const CATEGORIES_GET_FAILURE = 'CATEGORIES/GET_FAILURE'

// Actions

// Get list of CATEGORIES
export function getList(isLoading = true) {
    return dispatch => {
        dispatch({
            type: CATEGORIES_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'categories',
                fields: ['id', 'name', 'node', 'isActive',  { 'category': ['id', 'name'] }, 'createdAt', 'updatedAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: CATEGORIES_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.categories
                    })
                } else {
                    console.error(response)
                }
            })
            .catch(error => {
                dispatch({
                    type: CATEGORIES_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}



// Get list of CATEGORIES
export function getById(categoryId, isLoading = true) {
    return dispatch => {
        dispatch({
            type: CATEGORIES_GET_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'categoryById',
                variables: { categoryId },
                fields: ['id', 'name', 'node', 'isActive',  { 'category': ['id', 'name'] }]
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: CATEGORIES_GET_RESPONSE,
                        error: null,
                        isLoading: false,
                        item: response.data.data.categoryById
                    })
                } else {
                    console.error(response)
                }
            })
            .catch(error => {
                dispatch({
                    type: CATEGORIES_GET_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}

// Get single category by Id with parent category id
export function getSimpleCatById(id) {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'simpleCategoryById',
            variables: { id },
            fields: ['id', 'name', 'node', 'isActive',  { 'category': ['id', 'name'] }]
        }))
    }
}


// Create or update category
export function createOrUpdate(category) {
    if (category.id > 0) {
        return update(category)
    } else {
        delete category.id
        return create(category)
    }
}

// Create category
export function create(category) {
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'categoryCreate',
            variables: {  name: category.name, categoryId: category.category!=null ? category.category.id : 0, isActive: category.isActive},
            fields: ['id']
        }))
    }
}

// Update category
export function update(category) {
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'categoryUpdate',
            variables: {id: category.id, name: category.name, categoryId: category.category!=null ? category.category.id : 0, isActive: category.isActive},
            fields: ['id']
        }))
    }
}

// Remove category
export function remove(variables) {
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'categoryRemove',
            variables,
            fields: ['id']
        }))
    }
}

// Get product types
export function getcategories() {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'categories',
            fields: ['id', 'name', 'node', 'isActive',  { 'category': ['id', 'name'] }]
        }))
    }
}

// Get product types
export function getSubCategories(categoryId) {
    let id=parseInt(categoryId)
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'getSubCategories',
            variables: {categoryId: id},
            fields: ['id', 'name', 'node', 'isActive',  { 'category': ['id', 'name'] }]
        }))
    }
}

export function productByCategory(categoryId) {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'productsByCategory',
            fields: ['id', 'name', 'price', 'image']
        }));
    }
}