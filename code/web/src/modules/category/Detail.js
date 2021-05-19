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

// App Imports
import { routeImage, routes } from '../../setup/routes'
import { char_count, renderIf } from '../../setup/helpers'
import { getById, getSubCategories, productByCategory } from './api/actions'
import Loading from '../common/Loading'
import { productsByCategory } from '../product/api/actions'

import ProductItem from '../product/Item'
import { messageShow, messageHide } from '../common/api/actions'

import EmptyMessage from '../common/EmptyMessage'
import CategoryItem from './Item'

// Component
class Detail extends PureComponent {

    state = {
        subCategories: []
    }


    // Runs on server only for SSR
    static fetchData({ store, params }) {
        return store.dispatch(getById(params.id))
    }

    // Runs on client only
    componentDidMount() {
        let categoryId = parseInt(this.props.match.params.id)
        this.refresh(categoryId)
        this.getProducts(categoryId)
        this.subCategories(categoryId)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            var categoryId = parseInt(nextProps.match.params.id)
            this.refresh(categoryId)
            this.getProducts(categoryId)
            this.subCategories(categoryId)
        }
    }


    refresh = (categoryId) => {
        this.props.getById(categoryId)

    }

    getProducts = (categoryId) => {
        this.props.productsByCategory(categoryId)
    }

    subCategories = (categoryId) => {


        this.props.getSubCategories(categoryId)
            .then(response => {
                if (response.data.errors && response.data.errors.length > 0) {
                    this.props.messageShow(response.data.errors[0].message)
                } else {
                    console.log(categoryId)

                    this.setState({
                        subCategories: response.data.data.getSubCategories
                    })

                }
            })
            .catch(error => {
                this.props.messageShow(error + ' There was some error fetching categories. Please try again.')
            })

    }


 displayCategories(categories) {
    var t = [];
    var o = [];
    categories.map(category => {
      // if general category
      if (char_count(category.node, '.') == 0) {
        if (o.length != 0) {
          t.push(o);
          o = [];
          o.push(category);

        }
        else {

          o.push(category);
        }

      }
      //if child category
      else {
        o.push(category);
      }
    })

    /* add last iteration */
    t.push(o);

    return t;
  }

    render() {


        const { isLoading, item, error } = this.props.category;
        const { list } = this.props.productsByCategoryState
        const isproductsloading = this.props.productsByCategoryState.isLoading
        console.log(this.state.subCategories)

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
                                        <title>{`Category - ${item.name}`}</title>
                                        <meta name="description" content={`Category - ${item.name}`} />
                                        <meta property="og:title" content={`Category - ${item.name}`} />
                                        <meta property="og:description" content={`Category - ${item.name}`} />
                                    </Helmet>

                                    {/* Top title bar */}
                                    <Grid style={{ backgroundColor: grey }}>
                                        <GridCell style={{ padding: '2em', textAlign: 'center' }}>
                                            <H3 font="secondary">Category : {item.name}</H3>
                                        </GridCell>
                                    </Grid>
                                    {/* Category list */}
                                    <Grid style={{ maxWidth: "1000px", margin: "0 auto" }}>
                                        <p>SubCategories</p>
                                        {
                                            this.state.subCategories.length > 0

                                                ? this.displayCategories(this.state.subCategories).map((categoryWithSubcat, index) => (

                                                    <GridCell key={index} style={{ margin: "0.5em" }}>
                                                        <CategoryItem key={index} categories={categoryWithSubcat} style={{ padding: "1em" }} />
                                                    </GridCell>

                                                ))

                                                : <EmptyMessage message="No categories to show" />
                                        }

                                    </Grid>




                                    {/* Product list */}
                                    <Grid>
                                        {
                                            isproductsloading
                                                ? <Loading />
                                                : list && list.length > 0
                                                    ? list.map(product => (
                                                        <GridCell key={product.id} style={{ textAlign: 'center' }}>
                                                            <Link to={routes.product.path(product.slug)}></Link>
                                                            <ProductItem product={product} />

                                                        </GridCell>
                                                    ))
                                                    : <EmptyMessage message="No products to show" />
                                        }
                                    </Grid>


                                </div>
                            ))
                        : ''


                }



            </div>


        )
    }
}
// <Redirect to={routes.home.path} />
// Component Properties
Detail.propTypes = {
    category: PropTypes.object.isRequired,
    getById: PropTypes.func.isRequired,
    productsByCategory: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
    messageHide: PropTypes.func.isRequired,
    getSubCategories: PropTypes.func.isRequired,
    productsByCategoryState: PropTypes.object.isRequired,
}

// Component State
function detailState(state) {
    return {
        category: state.category,
        productsByCategoryState: state.productsByCategoryState
    }
}

export default withRouter(connect(detailState,
    {
        getById,
        getSubCategories,
        productsByCategory,
        messageShow,
        messageHide
    })(Detail))
