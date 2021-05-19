// App Imports
import * as dashboard from './dashboard'
import * as product from './product'
import * as crate from './crate'
import * as subscription from './subscription' 
import * as category from './category'
// Admin routes
const admin = {
    ...dashboard,
    ...product,
    ...crate,
    ...subscription,
     ...category
}

export default admin