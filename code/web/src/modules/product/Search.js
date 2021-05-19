// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'

// App Imports
import { searchProduct } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import ProductItem from './Item'
import { grey, grey2 } from '../../ui/common/colors'
import { H3, H4 } from '../../ui/typography'
import SearchForm from './SearchForm'

// Component
class Search extends PureComponent {

    // Runs on server only for SSR
    static fetchData({ store, params }) {
      return store.dispatch(searchProduct(params.searchstring,parseInt(params.categoryId),parseInt(params.transactionType)))
    }

  
  // Runs on client only
  componentDidMount() {
    this.refresh(
      this.props.match.params.searchstring,
       parseInt(this.props.match.params.categoryId),
       parseInt(this.props.match.params.transactionType)
       )
  }  
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.searchstring !== this.props.match.params.searchstring
       ||
      nextProps.match.params.categoryId !== this.props.match.params.categoryId
      ||
      nextProps.match.params.transactionType !== this.props.match.params.transactionType
      
      ) {
      this.refresh(nextProps.match.params.searchstring ,
        parseInt(nextProps.match.params.categoryId),
        parseInt(nextProps.match.params.transactionType)
        )
    }
  }



 


  refresh = (searchstring, categoryId, transactionType) => {
    this.props.searchProduct(searchstring,categoryId,transactionType)
  }

  render() {
    const { isLoading, list } = this.props.products
    
    return (
      <div>
         {/* Top title bar */}
         <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
    <H3 font="secondary">Search Results of "{this.props.match.params.searchstring}" </H3>
    <H4> {list.count && list.count} results</H4>
          
          </GridCell>
        </Grid>

          {/* searchForm */}
          <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{  textAlign: 'center' }}>
       <SearchForm searchstring={this.props.match.params.searchstring} categoryId={this.props.match.params.categoryId} transactionType={this.props.match.params.transactionType}/>
          </GridCell>
        </Grid>

        {/* Related product list */}
        <Grid>
          {
            isLoading
              ? <Loading/>
              : list && list.products && list.products.length > 0
                ? list.products.map(product => (
                    <GridCell key={product.id} style={{ textAlign: 'center' }}>
                      <ProductItem product={product}/>
                    </GridCell>
                  ))
                : <EmptyMessage message="No products to show" />
          }
        </Grid>
      </div>
    )
  }
}

// Component Properties
Search.propTypes = {
  products: PropTypes.object.isRequired,
  searchProduct: PropTypes.func.isRequired
}

// Component State
function searchState(state) {
  return {
    products: state.products
  }
}

export default withRouter(connect(searchState, { searchProduct })(Search))
