// Imports
import { GraphQLInt, GraphQLString, GraphQLList } from 'graphql'

// App Imports
import {getDiscussion, getAll, getById,NotReadMessage, NotSeenMessage } from './resolvers'
import {MessageType} from './types'

// FOR ADMIN: to see all messages User messages
export const messages = {
  type: new GraphQLList(MessageType),
  resolve: getAll
}

// To see all conversations 
export const userMessages = {
  type: new GraphQLList(MessageType),
  args: {
   userId: { type : GraphQLInt},
  
  },
  resolve: getById
}

// To see all conversations 
export const discussion = {
  type: new GraphQLList(MessageType),
  args: {
   discussionCode: { type : GraphQLInt},
  },
  resolve: getDiscussion
}

 
export const getNotReadMessages = {
  type: new GraphQLList(MessageType),
  args: {
   userId: { type : GraphQLInt},
  },
  resolve: NotReadMessage
}

 
export const getNotSeenMessages = {
  type: new GraphQLList(MessageType),
  args: {
   userId: { type : GraphQLInt},
  },
  resolve: NotSeenMessage
}