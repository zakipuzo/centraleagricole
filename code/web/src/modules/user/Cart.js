// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'
import Icon from "../../ui/icon"
import Button from "../../ui/button/Button";

// App Imports
import { routeImage } from '../../setup/routes'
import { remove, getCartByUser, saveCartItemQuantity } from '../cart/api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import { messageShow, messageHide } from "../common/api/actions";

// Component
class Cart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      ...props
    }
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCartByUser())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCartByUser()
  }


  onClickRemoveFromCart = (productId) => {
    console.log("hhhhhh" + productId)
    let check = confirm(
      "Are you sure you want to remove this product from cart?"
    );

    if (check) {
      this.setState({
        isLoading: true,
      });

      this.props.messageShow("removing product, please wait...");

      this.props
        .remove({ productId })
        .then((response) => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message);
          } else {
            this.props.messageShow("Product removed successfully.");

            this.props.getCartByUser();

          }
        })
        .catch((error) => {
          this.props.messageShow(
            "There was some error. Please try again."
          );
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });

          window.setTimeout(() => {
            this.props.messageHide();
          }, 5000);
        });
    }
  };
  saveQuantities = () => {
    this.state.cart.item.cartItems.map(item => {
      let id = parseInt(item.id)
      let quantity = parseInt(item.quantity)
      var cartItem = { id, quantity }

      this.props
        .saveCartItemQuantity(cartItem)
        .then((response) => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message);
          } else {
            this.props.messageShow("Quantity changed successfully.");

          }
        })

    })

  }

  onQuantityChange = (event) => {
    if (event.target.value > 0) {
      // event.targer.id   returns  index value of cartItem in cart array
      var cartItem = this.state.cart.item.cartItems[event.target.id];
      cartItem.quantity = event.target.value

      console.log(this.state.cart)

    }
    else {
      event.target.value = 1;
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    const { item } = this.props.cart;
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Cart</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">My Cart</H3>
            {item.cartItems ?
              <p style={{ marginTop: '1em', color: "black" }}>

                {item.cartItems.length == 0 || item.cartItems.length == 1 ?
                  <span>{item.cartItems.length} Item</span>
                  :
                  <span>{item.cartItems.length} Items</span>
                }
              </p>
              :
              <p></p>
            }
          </GridCell>
        </Grid>

        {/* Product list */}
        <table >

          <thead>
            <tr>
              <th>Picture</th>
              <th>Product</th>
              <th>Qty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.cart.isLoading
                ?
                <tr>
                  <td colSpan="4">Loading</td>
                </tr>
                :
                item.cartItems == undefined
                  ? 
                  <tr>
                  <td colSpan="4">Error</td>
                </tr>
                  :
                  item.cartItems.length > 0
                    ? item.cartItems.map((cartItem, index) => (



                      <tr key={index}>
                        <td  >
                          <img
                            src={`${routeImage}` + cartItem.product.image}
                            alt={cartItem.product.name}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>

                        <td>

                          {cartItem.product.name}

                        </td>

                        <td >

                          <input
                            id={index}
                            type="number"
                            defaultValue={cartItem.quantity}
                            onChange={this.onQuantityChange}
                            name="quantity"
                          />

                        </td>

                        <td style={{ textAlign: "center" }}>


                          <span style={{ cursor: 'pointer' }} onClick={this.onClickRemoveFromCart.bind(this, cartItem.product.id)}>
                            <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                          </span>



                        </td>
                      </tr>



                    ))
                    : <tr>
                      <td colSpan="4">
                        <EmptyMessage message="No products to show." />
                      </td>
                    </tr>
            }
          </tbody>
        </table>
        < div style={{ marginTop: '2em', textAlign: 'center' }}>
          <Button onClick={this.saveQuantities} type="submit" theme="secondary" disabled={this.state.isLoading}>
            <Icon size={1.2} style={{ color: "white" }}>check</Icon> Save
                  </Button>
        </div>
      </div>
    )

  }
}

// Component Properties
Cart.propTypes = {
  cart: PropTypes.object.isRequired,
  getCartByUser: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  saveCartItemQuantity: PropTypes.func.isRequired
}

// Component State
function cartState(state) {
  return {
    cart: state.cart
  }
}

export default connect(cartState, { getCartByUser, remove, messageShow, messageHide, saveCartItemQuantity })(Cart)
