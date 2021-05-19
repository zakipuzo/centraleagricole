// App Imports
import * as clientDashboard from './dashboard'
import * as product from './product' 
// Admin routes
const client = {
    ...clientDashboard,
    ...product
}

export default client