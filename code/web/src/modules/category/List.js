// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H1, H2, H3 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'
import { char_count } from '../../setup/helpers'
 
// App Imports
import { getList as getCategoriesList } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import CategoryItem from './Item'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getCategoriesList())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getCategoriesList()
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

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>La Centrale Agricole! - Categories</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Categories</H3>

            <p style={{ marginTop: '1em', color: grey2 }}>You can choose category which suits your need.</p>
          </GridCell>
        </Grid>

        {/* Category list */}
        <Grid style={{maxWidth: "1000px", margin: "0 auto"}}>

          {
            this.props.categories.isLoading
              ? <Loading />
              : this.props.categories.list.length > 0
                ? this.displayCategories(this.props.categories.list).map((categoryWithSubcat, index) => (

                  <GridCell key={index}  style={{ margin: "0.5em"}}>
                    <CategoryItem key={index} categories={categoryWithSubcat} style={{ padding: "1em" }} />
                  </GridCell>

                ))

                : <EmptyMessage message="No categories to show" />
          }

        </Grid>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategoriesList: PropTypes.func.isRequired
}

// Component State
function listState(state) {
  return {
    categories: state.categories
  }
}

export default connect(listState, { getCategoriesList })(List)
