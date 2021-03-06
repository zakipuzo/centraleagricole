// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { grey3 } from '../../ui/common/colors'

// App Imports
import ClientMenu from './common/Menu'

// Component
const Dashboard = () => (
  <div>
    {/* SEO */}
    <Helmet>
      <title>Dashboard - Client </title>
    </Helmet>

    {/* Top menu bar */}
    <ClientMenu/>

    {/* Page Content */}
    <Grid style={{ padding: '2em' }}>
      <GridCell>
        <p style={{ textAlign: 'center', color: grey3 }}>Nothing here yet. Choose an item from admin menu.</p>
      </GridCell>
    </Grid>
  </div>
)

// Component Properties
Dashboard.propTypes = {
  user: PropTypes.object.isRequired
}

// Component State
function dashboardState(state) {
  return {
    user: state.user
  }
}

export default connect(dashboardState, {})(Dashboard)
