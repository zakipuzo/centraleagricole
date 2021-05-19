// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import { getList as getSavedList } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage' 
import Item from '../product/Item'

// Component
class List extends   PureComponent {
  constructor(props){
    super(props)
    this.state={
      ...props
    }
  }

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getSavedList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getSavedList()
  }

  isProductSaved=(id)=>{
    if(this.state.savedProducts.list!=undefined && this.state.savedProducts.list.length>0){
    let b=false;
        this.state.savedProducts.list.map(svproduct=>{
          if(svproduct.id==id)
      {   b= true
      console.log("saved"+b)
      }
          
        })
        return b;
    }
  }

  render() {
    const {list, isLoading, error}=this.props.savedProducts
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Saved products</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Saved Products!</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>Saved Products</p>
          </GridCell>
        </Grid>

        {/* Saved Products list */}
        <Grid>
          <GridCell>
            {
             isLoading
                ? <Loading/>
                : list  && list.length > 0
                    ? this.props.savedProducts.list.map(saved => (
                      <div key={saved.product.id} style={{ margin: '2em', float: 'left' }}>
                        <Item saved={this.isProductSaved(saved.id)} product={saved.product} user={this.props.user}/>
                      </div>
                    ))
                    : <EmptyMessage message="No product to show" />
            }
          </GridCell>
        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  savedProducts: PropTypes.object.isRequired,
  getSavedList: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    savedProducts: state.savedProducts
  }
}

export default connect(listState, { getSavedList })(List)
