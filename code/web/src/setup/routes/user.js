// App Imports
import Login from '../../modules/user/Login'
import Signup from '../../modules/user/Signup'
import Profile from '../../modules/user/Profile'
import Subscriptions from '../../modules/user/Subscriptions'
import Cart from '../../modules/user/Cart'
import List from '../../modules/savedproduct/List'
import MessagesList from '../../modules/message/List'
import MessagesDetail from '../../modules/message/Detail'
import SendMsg from '../../modules/message/SendMsg'


// User routes
export default {
  login: {
    path: '/user/login',
    component: Login
  }
  ,

  signup: {
    path: '/user/signup',
    component: Signup
  },

  profile: {
    path: '/user/profile',
    component: Profile,
    auth: true
  }
  ,
  subscriptions: {
    path: '/user/subscriptions',
    component: Subscriptions,
    auth: true
  }
  ,
  cart: {
    path: '/user/cart',
    component: Cart,
    auth: true
  },
  saved: {
    path: '/user/saved',
    component: List,
    auth: true
  },

  messages: {
    path: '/user/messages',
    component: MessagesList,
    auth: true
  },

  discussion: {
    path: (discussionCode = ':discussionCode') => (`/user/discussion/${ discussionCode }`),
    component: MessagesDetail,
    auth: true
  }
   ,

  sendMessage: {
    path: (receiverId = ':receiverId') => (`/user/sendmessage/${ receiverId }`),
    component: SendMsg,
    auth: true
  }
}