// Imports
import React from 'react'
import { Link } from 'react-router-dom'

 
// App Imports
import user from '../../setup/routes/user'
import Icon from '../../ui/icon'

// Component
const CartMenuItem = (props) => {
    const { ...others } = props

  return (
    <Link to={user.cart.path} {...others}>
      <span style={{ fontSize: '1em', color: 'white'}}>
      <Icon size={1.2} style={{ color: "white" }}>shopping_cart</Icon></span>
    </Link>
  )
}

export default CartMenuItem
