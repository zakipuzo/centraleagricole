// Imports
import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } from 'graphql'

// App Imports
import { UserType } from '../user/types'
 

// Cart type
const MessageType = new GraphQLObjectType({
  name: 'messagetype',
  description: 'Message Type',

  fields: () => ({
    id: { type: GraphQLInt },
    sender: { type: UserType }, 
    receiver: { type: UserType },  
    content: {type: GraphQLString},
    isSeen: {type: GraphQLBoolean},
    isRead: {type: GraphQLBoolean},
    discussionCode : {type : GraphQLInt},
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
})
 


export  {MessageType}