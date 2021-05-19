// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'
import category from '../../../setup/routes/category'

// Actions Types
export const PRODUCTS_GET_LIST_REQUEST = 'PRODUCTS/GET_LIST_REQUEST'
export const PRODUCTS_GET_LIST_RESPONSE = 'PRODUCTS/GET_LIST_RESPONSE'
export const PRODUCTS_GET_LIST_FAILURE = 'PRODUCTS/GET_LIST_FAILURE'
export const PRODUCTS_GET_LIST_RESET = 'PRODUCTS/GET_LIST_RESET'
export const PRODUCTS_GET_REQUEST = 'PRODUCTS/GET_REQUEST'
export const PRODUCTS_GET_RESPONSE = 'PRODUCTS/GET_RESPONSE'
export const PRODUCTS_GET_FAILURE = 'PRODUCTS/GET_FAILURE'
export const PRODUCTS_GET_RELATED_LIST_REQUEST = 'PRODUCTS/GET_RELATED_LIST_REQUEST'
export const PRODUCTS_GET_RELATED_LIST_RESPONSE = 'PRODUCTS/GET_RELATED_LIST_RESPONSE'
export const PRODUCTS_GET_RELATED_LIST_FAILURE = 'PRODUCTS/GET_RELATED_LIST_FAILURE'
export const PRODUCTS_BY_CATEGORY_GET_LIST_REQUEST = 'PRODUCTS/BY_CATEGORY_GET_LIST_REQUEST'
export const PRODUCTS_BY_CATEGORY_GET_LIST_FAILURE = 'PRODUCTS/BY_CATEGORY_GET_LIST_FAILURE'
export const PRODUCTS_BY_CATEGORY_GET_LIST_RESPONSE = 'PRODUCTS/BY_CATEGORY_GET_LIST_RESPONSE'

// Actions

// Get list of products
export function getList(transactionType=0, isLoading = true, forceRefresh = false) {
   
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'products',
                variables: {transactionType:transactionType},
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.products
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}


/// Get list offer products
 export function getOfferList(isLoading = true, forceRefresh = false) {
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'offerProducts',
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.products
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}



/// Get list demand products
export function getDemandList(isLoading = true, forceRefresh = false) {
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'demandProducts',
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.products
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}

// Get User list of products
export function getUserProductList(id, isLoading = true, forceRefresh = false) {
 
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'userProducts', 
                variables: {id},
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.userProducts
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}


// Get single product
export function get(id, isLoading = true) {
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_REQUEST,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'product',
                variables: { id: parseInt(id) },
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name", 'email'] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
            }))

            
            .then(response => {
                if (response.status === 200) {
                    if (response.data.errors && response.data.errors.length > 0) {
                        dispatch({
                            type: PRODUCTS_GET_FAILURE,
                            error: response.data.errors[0].message,
                            isLoading: false
                        })
                    } else {
                        dispatch({
                            type: PRODUCTS_GET_RESPONSE,
                            error: null,
                            isLoading: false,
                            item: response.data.data.product
                        })
                    }
                } else {
                    dispatch({
                        type: PRODUCTS_GET_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_FAILURE,
                    error: error,
                    isLoading: false
                })
            })
    }
}

// Get single product by Id
export function getById(productId) {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'productById',
            variables: { productId },
            fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] }, {'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
        }))
    }
}

// Get list of products related to a product
export function getRelatedList(productId, isLoading = true) {
    return (dispatch, getState) => {
        let state = getState()
        
        if (state.productsRelated.list.length === 0 || state.productId !== productId) {
            dispatch({
                type: PRODUCTS_GET_RELATED_LIST_REQUEST,
                error: null,
                isLoading
            })

            return axios.post(routeApi, query({
                    operation: 'productsRelated',
                    variables: { productId },
                    fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] },{'productImages': ['id', 'image']}, 'description', 'image', 'createdAt']
                }))
                .then(response => {
                    if (response.status === 200) {
                        dispatch({
                            type: PRODUCTS_GET_RELATED_LIST_RESPONSE,
                            error: null,
                            isLoading: false,
                            list: response.data.data.productsRelated,
                            productId
                        })
                    } else {
                        dispatch({
                            type: PRODUCTS_GET_RELATED_LIST_FAILURE,
                            error: 'Some error occurred. Please try again.',
                            isLoading: false
                        })
                    }
                })
                .catch(error => {
                    dispatch({
                        type: PRODUCTS_GET_RELATED_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                })
        }
    }
}

// Create or update product
export function createOrUpdate(product) {
    if (product.id > 0) {
        return update(product)
    } else {
        delete product.id
        return create(product)
    }
}

// Create product
export function create(product) {
    var catIds = [];
    product.categories.forEach(cat => {
        catIds.push(parseInt(cat.id));
    });
    catIds = JSON.stringify(catIds);
    var images=JSON.stringify(product.productImages);
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'productCreate',
            variables: { name: product.name, productImages: images, price: product.price.toString(), description: product.description, slug: product.slug, categoriesIds: catIds, image: product.image, transactionType: product.transactionType },
            fields: ['id']
        }))
    }
}

// Update product
export function update(product) {
    console.log(product.productImages)
    var catIds = [];
    product.categories.forEach(cat => {
        catIds.push(cat.id);
    });
    catIds = JSON.stringify(catIds);
    var images = [];
    product.productImages.forEach(img => {
        images.push(img.image);
    });
    var images=JSON.stringify(product.productImages);
    var transactionId=parseInt(product.transactionType)

    console.log(images)
     return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'productUpdate',
            variables: {id: product.id, name: product.name, productImages: images, price: product.price.toString(), description: product.description, slug: product.slug, categoriesIds: catIds, image: product.image, transactionType: transactionId },
            fields: ['id']
        }))
    }
}

// Remove product
export function remove(variables) {
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'productRemove',
            variables,
            fields: ['id']
        }))
    }
}

// Get product types
export function getTypes() {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'productTypes',
            fields: ['id', 'name']
        }))
    }
}


// Get product types
export function getMoreProducts(productId, transactionType=0) {
    productId=parseInt(productId)
    if(productId)
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading: false
        })
        return axios.post(routeApi, query({
            operation: 'showMoreProducts',
            variables: {productId, transactionType},
            fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] }, 'description', 'image', 'createdAt']
        }))
        
    }
}


// Get product Transaction TYpes
export function getTransactionTypes() {
    return dispatch => {
        return axios.post(routeApi, query({
            operation: 'transactionTypes',
            fields: ['id', 'name']
        }))
    }
}

export function productsByCategory(categoryId, isLoading = true, forceRefresh = false) {
    return dispatch => {
        dispatch({
            type: PRODUCTS_BY_CATEGORY_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
                operation: 'productsByCategory',
                variables: { categoryId },
                fields: ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] }, 'description', 'image', 'createdAt']
            }))
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_BY_CATEGORY_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.productsByCategory
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_BY_CATEGORY_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}


//search products
export function searchProduct(search, categoryId=0,transactionType=0,isLoading = true, forceRefresh = false) {
    var data={
        search: search,
        categoryId: categoryId,
        transactionType: transactionType
    }

    console.log(categoryId)
    return dispatch => {
        dispatch({
            type: PRODUCTS_GET_LIST_REQUEST,
            error: null,
            isLoading
        })

        return axios.post(routeApi, query({
            operation: 'searchProduct',
            variables: {...data},
            fields: [{'products': ['id', 'name', 'price', 'slug', {'categories': ['id', "name"] },   {'transactionType': ['id', "name"] }, {'user': ['id', "name"] }, 'description', 'image', 'createdAt']} , 'count']
        })) 
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: PRODUCTS_GET_LIST_RESPONSE,
                        error: null,
                        isLoading: false,
                        list: response.data.data.searchProduct
                    })
                } else {
                    dispatch({
                        type: PRODUCTS_GET_LIST_FAILURE,
                        error: 'Some error occurred. Please try again.',
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: PRODUCTS_GET_LIST_FAILURE,
                    error: 'Some error occurred. Please try again.',
                    isLoading: false
                })
            })
    }
}




// Create or update product
export function userCreateOrUpdate(product) {
    if (product.id > 0) {
        return userProductUpdate(product)
    } else {
        delete product.id
        return userProductCreate(product)
    }
}

// Create product
export function userProductCreate(product) {
    var catIds = [];
    product.categories.forEach(cat => {
        catIds.push(cat.id);
    });
    catIds = JSON.stringify(catIds);
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'UserProductCreate',
            variables: { name: product.name, price: product.price.toString(), description: product.description, slug: product.slug, categoriesIds: catIds, image: product.image },
            fields: ['id']
        }))
    }
}

// Update product
export function userProductUpdate(product) {
    var catIds = [];
    product.categories.forEach(cat => {
        catIds.push(cat.id);
    });
    catIds = JSON.stringify(catIds);
    var pr = { id: product.id, name: product.name, price: product.price.toString(), description: product.description, slug: product.slug, categoriesIds: catIds, image: product.image };

    console.log(pr);
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'UserProductUpdate',
            variables: pr,
            fields: ['id']
        }))
    }
}

// Remove product
export function userProductRemove(variables) {
    return dispatch => {
        return axios.post(routeApi, mutation({
            operation: 'UserProductRemove',
            variables,
            fields: ['id']
        }))
    }
}
