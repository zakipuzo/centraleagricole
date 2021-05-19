// App Imports
import { APP_URL_API } from '../config/env'
import admin from './admin' 
import home from './home'
import user from './user'
import client from './client'
import product from './product'
import crate from './crate'
import category from './category'

// Combined routes
export const routes = Object.assign(admin, home, product, crate, category, user,client)

// API Routes
export const routeApi = APP_URL_API

// Image
export const routeImage = APP_URL_API