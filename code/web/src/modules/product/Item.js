// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import Icon from '../../ui/icon'
import H4 from '../../ui/typography/H4'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { routeImage, routes } from '../../setup/routes'
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user'
import { messageShow, messageHide } from '../common/api/actions'
import { addToCart } from '../cart/api/actions'
import { saveProduct as userSaveProduct } from '../savedproduct/api/actions'
import { Grid, GridCell } from '../../ui/grid'
import category from '../../setup/routes/category'

// Component
class Item extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      quantity: 1,
      saved: props.saved ? props.saved : false,


    }
  }



  addToCart = (productId, quantity) => {


    this.props.messageShow('Adding to cart, please wait...')
    var cartItem = { productId, quantity }
    this.props.addToCart(cartItem)
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {

          this.props.messageShow('Product added to cart successfully.')

        }
      })
      .catch(error => {
        this.props.messageShow('There was some error adding this product to cart. Please try again.')
      })
      .then(() => {

        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }
  /*
    saveProduct = (productId) => {
  
  
      this.props.messageShow('Saving product, please wait...')
  
      this.props.userSaveProduct(productId)
        .then(response => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            console.log(response.data.data.addremoveSavedProduct.id)
            if (response.data.data.addremoveSavedProduct.id != null) {
              this.props.messageShow('Product saved successfully.')
              this.setState({
                saved: true
              })
            }
            else {
              this.props.messageShow('Product unsaved successfully.')
              this.setState({
                saved: false
              })
            }
          }
        })
        .catch(error => {
          this.props.messageShow('There was some error saving this product. Please try again.')
        })
        .then(() => {
  
          window.setTimeout(() => {
            this.props.messageHide()
          }, 5000)
        })
    }
  */

  onQuantityChange = (event) => {
    if (parseInt(event.target.value) > 0) {
      this.setState({
        quantity: parseInt(event.target.value)
      }
      )

    }
    else {
      event.target.value = 1;
    }
  }


  render() {
    const { id, name, price, slug, description, image, transactionType, categories, user } = this.props.product



    var bg = routeImage + image;
    console.log(this.state)
    return (




      <Card style={{ width: '18em', margin: '2.5em auto', backgroundColor: white }}>

        <Link to={routes.product.path(id)}>

          <span className="transactionType">

            {transactionType.name}
          </span>
          <span className="itemPrice"> {price} MAD</span>
          <div style={{ width: '100%', height: "250px", backgroundImage: "url(" + bg + ")", backgroundSize: "cover" }} ></div>

          <div style={{ padding: '1em 1.2em' }}>
            <H4 font="secondary" style={{ color: black }}>{name}</H4>


          </div>
        </Link>

        {this.props.user.isAuthenticated
          ?
          /*add to cart */
          < div style={{ marginTop: '1em', marginBottom: '0.2em' }}>
            <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "#b5dcca" }}>
              Quantity

        <input

                type="number"
                defaultValue={this.state.quantity}
                onChange={this.onQuantityChange}
                name="quantity"
                style={{ width: "20%" }}
              />


              <Button
                theme="primary"
                onClick={this.addToCart.bind(this, id, this.state.quantity)}
                type="button"
                style={{ marginTop: '1em', marginBottom: '1em' }}
              >
                <Icon size={1.2} style={{ color: white }}>shopping_cart</Icon>
              </Button>
            </div>
            {/*
  <Button
          theme="primary"
          onClick={this.saveProduct.bind(this, id)}
          type="button"
          style={{ marginTop: '1em', marginBottom: '1em' }}
        >
          {this.state.saved ?
            <Icon size={1.2} style={{ color: white }}>bookmark</Icon>
            :
            <Icon size={1.2} style={{ color: white }}>bookmark_border</Icon>
          }
        </Button>
        */}
          </div>
          //else if not authenticated

          :
          <></>
        }

        <div>

          {
            categories ?
              categories.map((category) => {

                return (<span className="ItemProductCatgory" key={category.id}>
                  <Link to={routes.detailsCat.path(category.id)} style={{
                    backgroundColor: "red",
                    borderRadius: "2em"
                  }}>
                    {category.name}
                  </Link>
                </span>

                )

              })
              :
              <></>

          }
        </div>
        <div>
          Owner: 
          {
            <Link to={routes.clientShop.path(user.id)}>
              <span className="ItemProductCatgory"  >

                {user.name}

              </span>

            </Link>
          }
        </div>




        {/*#### */}

        {/* language=CSS */}
        <style jsx>{`
        .transactionType {
          position: absolute;
          background-color: #81303B;
           left: 0;
           color: #fff;
           font-size: 1em;
           padding: 1em;
        }

        .itemPrice {
          position: absolute;
    background-color: #386C5F;
    right: 0px;
    color: #fff;
    font-size: 1em;
    padding: 1em;
        }

    .ItemProductCatgory{
      
    }

        
       
      `}
        </style>
      </Card >




    )
  }
}

// Component Properties
Item.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  userSaveProduct: PropTypes.func.isRequired,

}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}

export default connect(itemState, { userSaveProduct, addToCart, messageShow, messageHide })(withRouter(Item))
