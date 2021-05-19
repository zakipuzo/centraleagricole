// Imports
import React from 'react'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { black, grey } from "../../../ui/common/colors"

// App Imports
 
import Menu from '../../common/header/Menu'
import MenuItem from '../../common/header/MenuItem'
import client from '../../../setup/routes/client'

// Component
const UserMenu = () => (
  <Grid style={{ backgroundColor: grey }}>
    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
      <Menu>  
        <MenuItem to={client.clientDashboard.path} type="primary" style={{ color: black }}>Dashboard</MenuItem>

        <MenuItem to={client.clientProductList.path} section="products" type="primary" style={{ color: black }}>Products</MenuItem>
 
      </Menu>
    </GridCell>
  </Grid>
)

export default UserMenu