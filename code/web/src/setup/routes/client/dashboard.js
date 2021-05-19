// App Imports
import params from '../../config/params.json'
import Dashboard from '../../../modules/client/Dashboard'

// Admin dashboard routes
export const clientDashboard = {
  path: '/client/dashboard',
  component: Dashboard,
  auth: true,
  role: params.user.roles.user
}