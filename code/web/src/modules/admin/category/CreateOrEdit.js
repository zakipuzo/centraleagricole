// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

// UI Imports
import { Grid, GridCell } from '../../../ui/grid'
import Button from '../../../ui/button'
import Icon from '../../../ui/icon'
import H4 from '../../../ui/typography/H4'
import { Input, Textarea, Select } from '../../../ui/input'
import { white } from "../../../ui/common/colors"

// App Imports
import admin from '../../../setup/routes/admin'
import {
  getcategories as getCategoryList,
  createOrUpdate as categoryCreateOrUpdate,
  getSimpleCatById as getCategoryById
} from '../../category/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import AdminMenu from '../common/Menu'
import { nullToEmptyString } from '../../../setup/helpers'

// Component
class CreateOrEdit extends Component {

  constructor(props) {
    super(props)
    // this state for create new category
    this.state = {
      isLoading: false,
      category: {
        id: 0,
        name: '',
        category: null,
        isActive: false
      },

      categories: []
    }

    this.isActive = React.createRef();
  }


  componentDidMount() {


    // Get category details (edit case)
    this.getCategory(parseInt(this.props.match.params.id));
    this.getcategories()
   
    
    

  }

  getCategory = (id) => {
    if (id > 0) {
      this.props.getCategoryById(id)
        .then(response => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            let cat = response.data.data.simpleCategoryById
            this.setState({
              category: response.data.data.simpleCategoryById
            })
             this.isActive.current.checked=(this.state.category.isActive);
          }
        })
        .catch(error => {
          this.props.messageShow('There was some error fetching category. Please try again.')
        })
    }
  }

  getcategories = () => {
    this.props.getCategoryList()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.setState({
            categories: response.data.data.categories
          })

        }
      })
      .catch(error => {
        this.props.messageShow(error + ' There was some error fetching categories. Please try again.')
      })

  }

  onChange = (event) => {
    let category = this.state.category
    category[event.target.name] = event.target.value


    this.setState({
      category
    })
  }

  onChangeSelect = (event) => {
    let category = this.state.category
    let id = parseInt(event.target.value);
 
    if (id ==0 ) {
      category.category = null;
    }
    else {
      category.category = {
        id,
        name: this.state.categories.find(obj => obj.id == id).name
    }

    }
    this.setState({
      category
    })
  }

  onChangeCheckbox = (event) => {
    
    let category = this.state.category
    if (event.target.checked)
      category[event.target.name] = true
    else
      category[event.target.name] = false

    this.setState({
      category
    })
  }

  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true
    })
    this.props.messageShow('Saving category, please wait...')

    // Save category
    this.props.categoryCreateOrUpdate(this.state.category)
      .then(response => {
        this.setState({
          isLoading: false
        })

        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Category saved successfully.')

          this.props.history.push(admin.categoryList.path)
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error. Please try again.')

        this.setState({
          isLoading: false
        })
      })
      .then(() => {
        window.setTimeout(() => {
          this.props.messageHide()
        }, 5000)
      })
  }

  render() {
    console.log(this.state)
    
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>category / Create or Edit - Admin - Crate</title>
        </Helmet>

        {/* Top menu bar */}
        <AdminMenu />

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'left' }}>
              <Link to={admin.categoryList.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* category list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                {this.props.match.params.id === undefined ? 'Create' : 'Edit'} Category
              </H4>

              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <div style={{ width: '25em', margin: '0 auto' }}>
                  {/* Name */}
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Name"
                    required="required"
                    name="name"
                    autoComplete="off"
                    value={this.state.category.name}
                    onChange={this.onChange}
                  />
                  {/* parent category */}
                  <Select
                    fullWidth={true}
                    required="required"
                    name="category"
                    value={this.state.category.category != null ? this.state.category.category.id : 0}
                    onChange={this.onChangeSelect}
                    style={{ marginTop: '1em' }}
                  >

                    <option value="0"  >Uncategorized</option>
                    {
                      this.state.categories.length > 0
                        ?
                        this.state.categories.map(c => (
                          c.id != this.state.category.id ?
                            <option value={c.id} key={c.id}>{c.name}</option>
                            :
                            0
                        ))
                        :
                        0


                    }
                  </Select>
 
                    <input onChange={this.onChangeCheckbox} type="checkbox" name="isActive"  ref={this.isActive} />

                   
                </div>

                {/* Form submit */}
                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                  <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                    <Icon size={1.2} style={{ color: white }}>check</Icon> Save
                  </Button>
                </div>
              </form>
            </GridCell>
          </Grid>
        </div>
      </div>
    )
  }
}




// Component Properties
CreateOrEdit.propTypes = {
  categoryCreateOrUpdate: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getCategoryById: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
  categoryCreateOrUpdate,
  getCategoryById,
  getCategoryList,
  messageShow,
  messageHide
})(CreateOrEdit))
