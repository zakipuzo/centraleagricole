// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import { white, black } from '../../../ui/common/colors'

// App Imports
import { getUserProductList as getUserProductList, userProductRemove as removeUserProduct } from '../../product/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import ClientMenu from '../common/Menu'
import { routeImage } from '../../../setup/routes'
import admin from '../../../setup/routes/admin'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getUserProductList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getUserProductList()
  }

  remove = (id) => {
    if (id > 0) {
      let check = confirm('Are you sure you want to delete this product?')

      if (check) {
        this.props.messageShow('Deleting, please wait...')

        this.props.removeUserProduct({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                this.props.messageShow(response.data.errors[0].message)
              } else {
                this.props.messageShow('Product deleted successfully.')

                this.props.getUserProductList(false)
              }
            } else {
              this.props.messageShow('Please try again.')
            }
          })
          .catch(error => {
            this.props.messageShow('There was some error. Please try again.')

          })
          .then(() => {
            this.setState({
              isLoading: false
            })

            window.setTimeout(() => {
              this.props.messageHide()
            }, 5000)
          })
      }
    }
  }

  render() {
    const { isLoading, list } = this.props.products

    console.log(this.props.products)
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Products - Admin - Crate</title>
        </Helmet>

        {/* Top menu bar */}
        <ClientMenu/>

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'right' }}>
              <Link to={admin.productCreate.path}>
                <Button theme="secondary" style={{ marginTop: '1em' }}>
                  <Icon size={1.2} style={{ color: white }}>add</Icon> Add
                </Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Product list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <table className="striped">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th width='20%'>Name</th>
                    <th>Price</th>
                    <th width='20%' >Description</th>
                    <th>Created at</th>
                    <th>Updated at</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                {
                  isLoading
                    ? <tr>
                        <td colSpan="6">
                          <Loading message="loading products..."/>
                        </td>
                      </tr>
                    : list
                      ? list.map(({ id, image, name, description, price, createdAt, updatedAt }) => (
                          <tr key={id}>
                            <td>
                              <img src={routeImage + image} alt={name} style={{ width: 100 }}/>
                            </td>

                            <td>
                              { name }
                            </td>

                            <td>
                              { price } MAD
                            </td>
                             <td>
                              { description }
                            </td>
                            <td>
                              { new Date(parseInt(createdAt)).toDateString() }
                            </td>

                            <td>
                              { new Date(parseInt(updatedAt)).toDateString() }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              <Link to={admin.productEdit.path(id)}>
                                <Icon size={2} style={{ color: black }}>mode_edit</Icon>
                              </Link>

                              <span style={{ cursor: 'pointer' }} onClick={this.remove.bind(this, id)}>
                                  <Icon size={2} style={{ marginLeft: '0.5em' }}>delete</Icon>
                                </span>
                            </td>
                          </tr>
                        ))
                      : <tr>
                          <td colSpan="6">
                            <EmptyMessage message="No products to show."/>
                          </td>
                        </tr>
                }
                </tbody>
              </table>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  products: PropTypes.object.isRequired,
  getUserProductList: PropTypes.func.isRequired,
  removeUserProduct: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}


// Component State
function listState(state) {
  return {
    products: state.products
  }
}

export default connect(listState, { getUserProductList, removeUserProduct, messageShow, messageHide })(List)
