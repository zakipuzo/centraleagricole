// Imports
import { GraphQLString, GraphQLInt,  } from 'graphql'

// App Imports
import {MessageType} from './types'
import { create, remove, setMessageSeen } from './resolvers'

// Message create
export const messageCreate = {
    type: MessageType,
    args: { 
        receiverId: {
            name: 'receiver',
            type: GraphQLInt
        },

        content: {
            name: 'content',
            type: GraphQLString
        }
    },
    resolve: create
}

 
// Message remove
export const MessageRemove = {
    type: MessageType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}


export const SeenMessage = {
    type: MessageType,
    args: {
        discussionCode: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: setMessageSeen
}

