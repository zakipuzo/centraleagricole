// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Card from '../../ui/card/Card'
import { H2, H3, H4 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'
import Button from '../../ui/button/Button'
import Icon from '../../ui/icon'

// App Imports
import { routeApi, routeImage, routes } from '../../setup/routes'
import { renderIf } from '../../setup/helpers'
import { get } from './api/actions'
import Loading from '../common/Loading'
import Related from './Related'

import { addToCart } from '../cart/api/actions'
import { messageShow, messageHide } from '../common/api/actions'


// Component

import { saveProduct as userSaveProduct, isSaved } from '../savedproduct/api/actions'
import { message } from '../message/api/state'


class Detail extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      saved: false,

    }
  }



  // Runs on server only for SSR
  static fetchData({ store, params }) {
    return store.dispatch(get(params.id))
  }


  // Runs on client only
  componentDidMount() {
    this.refresh(this.props.match.params.id);

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.refresh(nextProps.match.params.id)
    }
  }


  refresh = (id) => {
    this.props.get(id)
    this.checkProductSaved(id)
  }

  ///get 
  checkProductSaved = (productId) => {

    this.props.isSaved(productId)
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          if (response.data.data.isProductSaved != null) {
            this.setState({
              saved: true
            })
          }
          else {
            this.setState({
              saved: false
            })
          }

        }
      })
      .catch(error => {
        this.props.messageShow(error + ' There was some error fetching categories. Please try again.')
      })

  }





  saveProduct = (productId) => {


    this.props.messageShow('Saving product, please wait...')

    this.props.userSaveProduct(productId)
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Product saved successfully.')
          this.setState({
            saved: !this.state.saved
          })

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

  addToCart = (productId) => {


    this.props.messageShow('Adding to cart, please wait...')

    this.props.addToCart({ productId, quantity: 1 })
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

  render() {
    const { isLoading, item, error } = this.props.product
    console.log(this.props.user)
    console.log(this.props.product)

    return (

      <div>
        {
          !error
            ? isLoading
              ? <Loading />
              : renderIf(item && item.id, () => (
                <div>
                  {/* SEO */}
                  <Helmet>
                    <title>{`Product - ${item.name}`}</title>
                    <meta name="description" content={`Product - ${item.name}`} />
                    <meta property="og:title" content={`Product - ${item.name}`} />
                    <meta property="og:image" content={routeImage + item.image} />
                    <meta property="og:description" content={`Product - ${item.name}`} />
                  </Helmet>

                  {/* Top title bar */}
                  <Grid style={{ backgroundColor: grey }}>
                    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                      <H3 font="secondary">Product</H3>
                    </GridCell>
                  </Grid>

                  {/* Product Details */}
                  <Grid gutter={true} alignCenter={true} style={{ padding: '2em' }}>
                    {/* Left Content - Image */}
                    <GridCell style={{ maxWidth: '35em' }}>
                      <Card>
                        <a href={(routeImage + item.image)}><img src={routeImage + item.image} alt={item.name} style={{ width: '50vh' }} />
                        </a>
                      </Card>
                    </GridCell>

                    {/* Right Content */}
                    <GridCell style={{ textAlign: 'center', width: '50vh' }}>
                      <span>{item.transactionType.name}</span>
                      <H2 font="secondary">{item.name}</H2>
                      <hr />
                      <span style={{ fontSize: '2em', padding: "0.1em", borderRadius: "1.24em" }}> {item.price} MAD</span>
                      <H4 style={{ marginTop: '1em' }}>{item.description}</H4>

                      <p style={{ marginTop: '0.5em', color: grey2 }}>
                        Launched on {new Date(parseInt(item.createdAt)).toDateString()}
                      </p>

                      <div>
                        <p style={{ marginTop: '0.5em', color: grey2 }}>
                          Category:
                      </p>
                        {
                          item.categories.map((category) => {

                            return (<span className="ItemProductCatgory" key={category.id}>
                              <Link to={routes.detailsCat.path(category.id)}>
                                {category.name}
                              </Link>
                            </span>

                            )

                          })

                        }
                      </div>
                      <p style={{ marginTop: '0.5em', color: grey2 }}>
                        Published by <Link to={routes.clientShop.path(item.user.id)}>
                          {item.user.name}</Link>
                      </p>

                      {this.props.user.isAuthenticated
                        ?
                        <div style={{ textAlign: 'center', marginTop: '0.5em', marginBottom: '1em' }}>



                          {/*add to cart */}

                          <Button
                            theme="primary"
                            onClick={this.addToCart.bind(this, item.id)}
                            type="button"
                          >
                            <Icon size={1.2} style={{ color: "white" }}>shopping_cart</Icon>
                          </Button>
                          <span>  </span>
                          {
                            item.user.email != this.props.user.details.email ?
                              <Link to={routes.sendMessage.path(item.user.id)}>
                                <Button
                                  theme="primary"
                                  type="button"
                                >
                                  <Icon size={1.2} style={{ color: "white" }}>message</Icon>Send Message
                          </Button>
                              </Link>
                              :
                              <></>
                          }
                          <span>  </span>
                          {/* save product  */}
                          <Button
                            theme="primary"
                            onClick={this.saveProduct.bind(this, item.id)}
                            type="button"
                            style={{ marginTop: '1em', marginBottom: '1em' }}
                          >
                            {this.state.saved ?
                              <Icon size={1.2} style={{ color: "white" }}>bookmark</Icon>
                              :
                              <Icon size={1.2} style={{ color: "white" }}>bookmark_border</Icon>
                            }
                          </Button>
                        </div>


                        :
                        <></>
                      }

                    </GridCell>
                  </Grid>
                  {/* Product Images */}
                  <Grid style={{ backgroundColor: grey }}>
                    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                      <H3 font="secondary">Images</H3>
                      {item.productImages.length} images
                      {item.productImages && renderIf(item.productImages.length > 0, () => (
                        item.productImages.map((prodimage) => (

                          <a key={prodimage.id} href={routeImage + prodimage.image}><img src={routeImage + prodimage.image} alt="Product Image"
                            style={{ width: 200, marginTop: '1em' }} />
                          </a>
                        ))
                      )
                      )
                      }
                    </GridCell>
                  </Grid>

                  {/* Related products list */}

                  {/* Related products title bar */}
                  <Grid style={{ backgroundColor: grey }}>
                    <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                      <H3 font="secondary">Related Products</H3>
                    </GridCell>
                  </Grid>

                  {/* Related products list */}
                  <Related productId={item.id} />
                </div>
              ))
            : <Redirect to={routes.home.path} />
        }
      </div>
    )
  }
}

// Component Properties
Detail.propTypes = {
  product: PropTypes.object.isRequired,
  user: PropTypes.object,
  get: PropTypes.func.isRequired,
  isSaved: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired,
  userSaveProduct: PropTypes.func.isRequired,

}

// Component State
function detailState(state) {
  return {
    product: state.product,
    user: state.user
  }
}

export default withRouter(connect(detailState, { isSaved, userSaveProduct, get, addToCart, messageShow, messageHide })(Detail))

