// Imports
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { primary as primaryGradient } from '../../../ui/common/gradients'
import { level1 } from '../../../ui/common/shadows'

// App Imports
import home from '../../../setup/routes/home'
import category from '../../../setup/routes/category'
import user from '../../../setup/routes/user'
import crate from '../../../setup/routes/crate'
import admin from '../../../setup/routes/admin'
import client from '../../../setup/routes/client'
import Logo from './Logo'
import Menu from './Menu'
import MenuItem from './MenuItem'
import CartMenuItem from '../CartMenuItem'
import Icon from '../../../ui/icon'
import {Container} from '@material-ui/core'
import product from '../../../setup/routes/product'
import ToolbarComponent from './ToolbarComponent'
import DrawerComponent from './DrawerComponent'
 

// Component
class Header extends Component {
  constructor(props){
    super(props)
   
    this.state={
   
      left: false,
      ...props
    }
  }


  


  toggleDrawer = () => {
    // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }

    this.setState({ left: false });
  };

  openDrawer = () => {
    this.setState({
      left: true
    });
  };
  
  render (){
    console.log(this.state.left)
  return (
    <header  >
 
 <ToolbarComponent openDrawerHandler={this.openDrawer} />
        <DrawerComponent
          left={this.state.left}
          toggleDrawerHandler={this.toggleDrawer}
        />
          {/* Logo */}
         
         
    <Menu style={{width: "100%", height: "100%" , display: "flex" , alignItems: "center", justifyContent: "space-evenly"}} >
    
          {/* Left menu */}
          <Container maxWidth="sm">
          <Logo name="La Centrale" style={{ float: 'left' }}/>
             {/*  <MenuItem to={home.men.path}>Men</MenuItem> */}

           {/* <MenuItem to={home.women.path}>Women</MenuItem> */}

             {/*  <MenuItem to={home.howItWorks.path}>How It Works</MenuItem> <MenuItem to={home.whatsNew.path}>Products</MenuItem> */}
             <MenuItem to={product.offers.path}>Offers</MenuItem>
             <MenuItem to={product.demands.path}>Demands</MenuItem>

            <MenuItem to={category.listCat.path}>Catégories</MenuItem>
         
     

        {/* Right menu */}
 
          {
            this.props.user.isAuthenticated
              ?
        <>
                { this.props.user.details.role === 'ADMIN' && <MenuItem to={admin.dashboard.path} section="admin">Admin</MenuItem> }
                { this.props.user.details.role === ' ' && <MenuItem to={client.dashboard.path} section="client">My Shop</MenuItem> }

               {/*<MenuItem to={crate.list.path}>Crates</MenuItem>

          <MenuItem to={user.subscriptions.path}>Subscriptions</MenuItem> */}

                <MenuItem to={user.profile.path}>Profile</MenuItem>
                <MenuItem to={user.cart.path}> <Icon size={1.2} style={{ color: "white" }}>shopping_cart</Icon></MenuItem> 
             
            </>
              :

            <>
                <MenuItem to={user.login.path}>Login</MenuItem>

                <MenuItem to={user.signup.path}>Signup</MenuItem> 
              </>
          }

          </Container>
            </Menu>
      
     
    </header>
  )
        }
}

// Component Properties
Header.propTypes = {
  user: PropTypes.object.isRequired,
  
}

// Component State
function headerState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(headerState, {})(Header))
