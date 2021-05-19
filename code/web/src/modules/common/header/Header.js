// Imports
import React, { Component } from 'react'
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
import { Container } from '@material-ui/core'
import product from '../../../setup/routes/product'
import ToolbarComponent from './ToolbarComponent'
import DrawerComponent from './DrawerComponent'
import { notSeenMessages } from '../../message/api/actions'


// Component
class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {

      left: false,
      messageNotSeenCount:0,
      ...props
    }
  }

  componentDidMount(){
    this.getNotSeenMessagesCount();
    
  }


  getNotSeenMessagesCount=()=>{
    this.props.notSeenMessages()
    .then(response => {
      if (response.data.errors && response.data.errors.length > 0) {
        this.props.messageShow(response.data.errors[0].message)
      } else {
           
             this.setState({
              messageNotSeenCount: response.data.data.getNotSeenMessages.length
             })     
         
       
      }
    })
    .catch(error => {
      this.props.messageShow(error + ' There was some error fetching categories. Please try again.')
    })
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

  render() {
    console.log(this.state.left)
    return (
       <>
        <ToolbarComponent notSeenMsgCount={this.state.messageNotSeenCount} user={this.props.user} openDrawerHandler={this.openDrawer} style={{
         
        }} />
        <DrawerComponent
          left={this.state.left}
          toggleDrawerHandler={this.toggleDrawer}
          user={this.props.user}
        />
        {/* Logo */}

  
    </>
    )
  }
}

// Component Properties
Header.propTypes = {
  user: PropTypes.object.isRequired,
  notSeenMessages: PropTypes.func.isRequired,
}

// Component State
function headerState(state) {
  return {
    user: state.user
  }
}

export default withRouter(connect(headerState, {notSeenMessages})(Header))
