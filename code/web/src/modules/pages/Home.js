// Imports
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H1, H4 } from '../../ui/typography'
import Button from '../../ui/button'
import { white, black } from '../../ui/common/colors'
import { textLevel1 } from '../../ui/common/shadows'

// App Imports
import { APP_URL } from '../../setup/config/env'
import crateRoutes from '../../setup/routes/crate'
import userRoutes from '../../setup/routes/user'
import Onboarding from './Onboarding'
import SearchForm from '../product/SearchForm'
// Component
const Home = (props) => (
  <div>
    {/* Home */}
    <Grid  style={{
      /*backgroundImage: `url('${APP_URL}/images/cover2.jpg')`,*/
      backgroundAttachment: 'fixed',
      backgroundSize: 'contain',
      backgroundPosition: 'center top',
      height: 'calc(100vh - 5em)',
      textAlign: 'center',
      color: black
    }}>
      {/* SEO */}
      <Helmet>
        <title>Centrale Agricole </title>
      </Helmet>

      {/* Content */}
      <GridCell style={{ backgroundColor: "rgba(225,225,225,.6)", paddingTop: "2em", paddingBottom: "2em" }}>
        <div className="textSmallUnderline">
          <H1 font="secondary" style={{ textShadow: textLevel1 }} >La Centrale Agricole</H1>
        </div>
        <H4 style={{ textShadow: textLevel1, margin: '2em' }}>
          The first Moroccan Agriculture Marketplace
        </H4>

        {/* Call to action */}
        <SearchForm />
        {/* //*/}

        {/* Call to action */}
        {
          props.user.isAuthenticated
            ? <Link to={crateRoutes.list.path}>
              {/*<Button theme="secondary" style={{ marginTop: '1em' }}>Get Subscription</Button> */}
            </Link>
            : <Link to={userRoutes.signup.path}>
              <Button theme="secondary" style={{ marginTop: '1em' }}>Get Started</Button>
            </Link>
        }
      </GridCell>
    </Grid>

    {/* Onboarding */}
    <Onboarding /> 

    <style jsx>
      {
        `
        .textSmallUnderline{
          position: relative;
        
        }

        .textSmallUnderline:after {
          content:'';
          height:8px;
          width:20%;
          background:#fff;
          position:absolute;
          left:calc(50% - 10%);
          bottom:-13px; 
          
        }
        `
      }
    </style>
  </div>
)

// Component Properties
Home.propTypes = {
  user: PropTypes.object.isRequired

}

// Component State
function homeState(state) {
  return {
    user: state.user
  }
}

export default connect(homeState, {})(Home)
