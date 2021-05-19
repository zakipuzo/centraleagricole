// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import { H3 } from '../../../ui/typography'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import { white, grey, grey2 } from '../../../ui/common/colors'

// App Imports
import crateRoutes from '../../../setup/routes/crate'
import userRoutes from '../../../setup/routes/user'
import {   getUserProductList, getMoreProducts } from '../../product/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import ProductItem from '../../product/Item'
import { messageShow } from '../../common/api/actions'
import user from '../../../setup/routes/user'

// Component
class ClientShop extends PureComponent {
  constructor(props) {
    super(props)
     this.state = {
        ...props
    }
}
  // Runs on server only for SSR
  static fetchData({ store, params }) {
    return store.dispatch(getUserProductList(parseInt(params.id)))
  }

  // Runs on client only
  componentDidMount() {
    this.props.getUserProductList(parseInt(this.props.match.params.id));
    
    
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.match.params.id === this.props.match.params.id)
    if (nextProps.match.params.id !== this.props.match.params.id) {
        this.props.getUserProductList(parseInt(nextProps.match.params.id));
       
    }
  }


  onClickLoadMore = () => {

    ///get more products

    const { isLoading, list } = this.props.products


    let lastElementIndex = parseInt(list.length - 1);

    let productId = list[lastElementIndex].id
    this.props.getMoreProducts(productId)

      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else { 

          let more= response.data.data.showMoreProducts
           
          this.setState({
            products : {
             
                list : [...this.state.products.list, ...more]
            }
          })
         
        }
      })
      .catch(error => {
        this.props.messageShow(error + ' There was some error fetching more products. Please try again.')
      })

  }




  render() {

    console.log(this.state)

    

    
    const { isLoading, list } = this.props.products
    return (
      <div>

        {/* SEO */}
        <Helmet>
          <title>Products</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }} >
          <GridCell alignCenter={true} style={{ padding: '2em',  textAlign: 'center'  }}>
    <H3 font="secondary"> shop</H3>

    {list && list.length ? 
    list.length==1 || list.length==1 ?
    
     <p style={{ marginTop: '1em', color: grey2 }}> {list.length} product</p>
      :
      <p style={{ marginTop: '1em', color: grey2 }}> {list.length} products</p>
      :
      <p style={{ marginTop: '1em', color: grey2 }}> 0 product</p>
    }
          </GridCell>
        </Grid>

        {/* Product list */}
        <Grid >

          {
            isLoading
              ? <Loading />
              : list && list.length > 0
                ?

                list.map((product, index) => (

                  <GridCell alignCenter={true} key={index} style={{ padding: '2em' }}>
                    <ProductItem product={product} />
                  </GridCell>
                ))
                : <EmptyMessage message="No products to show" />
          }


        </Grid>
        <div style={{textAlign : "center", paddingBottom: "1em"}}>

          <Button onClick={this.onClickLoadMore.bind(this)} theme="secondary" >
            <Icon size={1.2} style={{ color: white }}>check</Icon> Show More
            </Button>
         </div>


          {/* Bottom call to action bar
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '3em', textAlign: 'center' }}>
            <p style={{ marginBottom: '1em', color: grey2 }}>Like what you see?</p> */}

          {/*
              this.props.user.isAuthenticated
                ? <Link to={crateRoutes.list.path}>
                    <Button theme="primary">
                      Subscribe <Icon size={1.2} style={{ color: white }}>navigate_next</Icon>
                    </Button>
                  </Link>
                : <Link to={userRoutes.signup.path}>
                    <Button theme="primary">Start <Icon size={1.2} style={{ color: white }}>navigate_next</Icon></Button>
                  </Link>
           
          </GridCell>
        </Grid>
         */}

        </div>
    )
  }
}

// Component Properties
ClientShop.propTypes = {
          user: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  getUserProductList: PropTypes.func.isRequired,
  getMoreProducts: PropTypes.func,
  messageShow: PropTypes.func.isRequired,
}

// Component State
function ClientShopState(state) {
  return {
          user: state.user,
    products: state.products
  }
}

export default connect(ClientShopState, { getUserProductList, getMoreProducts, messageShow})(ClientShop)
