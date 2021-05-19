// Imports
import axios from 'axios'
import { query, mutation } from 'gql-query-builder'

// App Imports
import { routeApi } from '../../../setup/routes'

// Actions Types
export const MESSAGES_GET_LIST_REQUEST = 'MESSAGES/GET_LIST_REQUEST'
export const MESSAGES_GET_LIST_RESPONSE = 'MESSAGES/GET_LIST_RESPONSE'
export const MESSAGES_GET_LIST_FAILURE = 'MESSAGES/GET_LIST_FAILURE'
export const MESSAGES_GET_REQUEST = 'MESSAGES/GET_REQUEST'
export const MESSAGES_GET_RESPONSE = 'MESSAGES/GET_RESPONSE'
export const MESSAGES_GET_FAILURE = 'MESSAGES/GET_FAILURE'

// Actions

// Get list of messages
export function getList(orderBy = 'DESC', isLoading = true) {
  return dispatch => {
    dispatch({
      type: MESSAGES_GET_LIST_REQUEST,
      error: null,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'userMessages',
      fields: ['id', 'discussionCode', {'sender': ['id','name', 'email']}, {'receiver': ['id','name', 'email']}, 'isSeen', 'content', 'createdAt']
    }))
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: MESSAGES_GET_LIST_RESPONSE,
            error: null,
            isLoading: false,
            list: response.data.data.userMessages
          })
        } else {
          console.error(response)
        }
      })
      .catch(error => {
        dispatch({
          type: MESSAGES_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single message
export function get(discussionCode, isLoading = true) {
  return dispatch => {
    dispatch({
      type: MESSAGES_GET_LIST_REQUEST,
      isLoading
    })

    return axios.post(routeApi, query({
      operation: 'discussion',
      variables: { discussionCode: parseInt(discussionCode) },
      fields: ['id', 'discussionCode', {'sender': ['id','name', 'email']}, {'receiver': ['id','name', 'email']}, 'content', 'createdAt']
    }))
      .then(response => {
       
        dispatch({
          type: MESSAGES_GET_LIST_RESPONSE,
          error: null,
          isLoading: false,
          list: response.data.data.discussion
        })
      })
      .catch(error => {
        dispatch({
          type: MESSAGES_GET_LIST_FAILURE,
          error: 'Some error occurred. Please try again.',
          isLoading: false
        })
      })
  }
}

// Get single message by Id
export function getById(messageId) {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'messageById',
      variables: { messageId },
      fields: ['id', 'name', 'description']
    }))
  }
}

// Create or update message
export function createOrUpdate(message) {
  if (message.id > 0) {
    return update(message)
  } else {
    delete message.id
    return create(message)
  }
}

// Create message
export function create(receiverId, content) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'messageCreate',
      variables: {receiverId: parseInt(receiverId), content: content},
      fields: ['id']
    }))
  }
}

// Update message
export function update(message) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'messageUpdate',
      variables: message,
      fields: ['id']
    }))
  }
}

// Remove message
export function remove(variables) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'messageRemove',
      variables,
      fields: ['id']
    }))
  }
}

// Get not seen messages
export function notSeenMessages() {
  return dispatch => {
    return axios.post(routeApi, query({
      operation: 'getNotSeenMessages', 
      fields: ['id']
    }))
  }
}


// Get not seen messages
export function setMessageSeen(discussionCode) {
  return dispatch => {
    return axios.post(routeApi, mutation({
      operation: 'SeenMessage', 
      variables: {discussionCode: parseInt(discussionCode)},
      fields: ['id']
    }))
  }
}