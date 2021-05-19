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
import { routeImage } from "../../../setup/routes"
import { renderIf, slug } from '../../../setup/helpers'
import {
  userCreateOrUpdate as productCreateOrUpdate,
  getTypes as getProductTypes,
  getById as getProductById,
  getTransactionTypes
} from '../../product/api/actions'

import {
  getcategories as getCategoryList
} from '../../category/api/actions'
import { getGenders as getUserGenders } from '../../user/api/actions'
import { upload, messageShow, messageHide } from '../../common/api/actions'
import ClientMenu from '../common/Menu'
import { char_count } from '../../../setup/helpers'
import product from '../../../setup/routes/product'

// Component
class CreateOrEdit extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      product: {
        id: 0,
        name: '',
        slug: '',
        description: '',
        type: 0,
        price: null,
        gender: 0,
        transactionType:0,
        image: '',
        productcategories: []
      },

      productTypes: [],
      userGenders: [],
      categories: [],
      transactionTypes: []
    }
  }

  componentDidMount() {
    // Get product types
    this.props.getProductTypes()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          let product = this.state.product
          product.gender = response.data.data.productTypes[0].id

          this.setState({
            productTypes: response.data.data.productTypes,
            product
          })
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error fetching product types. Please try again.')
      })

  

    // Get user genders
    this.props.getUserGenders()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          let product = this.state.product
          product.gender = response.data.data.userGenders[0].id

          this.setState({
            userGenders: response.data.data.userGenders,
            product
          })
        }
      })
      .catch(error => {
        this.props.messageShow('There was some error fetching product types. Please try again.')
      })

    // Get product details (edit case)
    this.getProduct(parseInt(this.props.match.params.id))

    //get all categories
    this.getcategories()

    //get all Transaction types
    this.getAllTransactionTypes()

  }

  getProduct = (productId) => {
    if (productId > 0) {
      this.props.getProductById(productId)
        .then(response => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message)
          } else {
            this.setState({
              product: response.data.data.productById,

            })

          }
        })
        .catch(error => {
          this.props.messageShow('There was some error fetching product types. Please try again.')
        })
    }
  }

  ///get all categories
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

  /// find id category exists in productCategory
  productHasCategory = (id) => {
    var productcategories = this.state.product.productcategories;
    var bool = false;
    for (var i = 0; i < productcategories.length; i++) {

      if (productcategories[i].category.id == id) {
        bool = true;
        break;
      }
      else {
        bool = false;
      }
    }

    return bool;
  }


  getAllTransactionTypes= () =>{
         // Get transaction types
         this.props.getTransactionTypes()
         .then(response => {
           if (response.data.errors && response.data.errors.length > 0) {
             this.props.messageShow(response.data.errors[0].message)
           } else {
     
             let product = this.state.product
             product.transactionType = response.data.data.transactionTypes[0].id
     
             this.setState({
               transactionTypes: response.data.data.transactionTypes,
               product
             })
           }
         })
         .catch(error => {
           this.props.messageShow('There was some error fetching product types. Please try again.')
         })
  }

  onChange = (event) => {
    let product = this.state.product
    product[event.target.name] = event.target.value

    if (event.target.name === 'name') {
      product.slug = slug(event.target.value)
    }

    this.setState({
      product
    })
  }



  onChangeSelect = (event) => {
    let product = this.state.product
    product[event.target.name] = parseInt(event.target.value)

    this.setState({
      product
    })
  }

  ///onChange checkbox categories
  onChangeCheckbox = (event) => {
    //khdama push

    var product = this.state.product;
    if (event.target.checked) {
      product.productcategories.push({ category: { id: parseInt(event.target.value) } })
    }
    else {

      ///forEach does not have break instruction 
      var BreakException = {};
      try {
        product.productcategories.forEach((prodcat, index) => {
          if (prodcat.category.id == parseInt(event.target.value)) {
            product.productcategories.splice(index, 1);
            throw BreakException;
          }
        }
        );
      } catch (e) {
        if (e !== BreakException) throw e;
      }


    }
    this.setState({
      product
    })
  }


  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true
    })

    this.props.messageShow('Saving product, please wait...')



    // Save product
    console.log("hwahada ");
    this.props.productCreateOrUpdate(this.state.product)
      .then(response => {
        this.setState({
          isLoading: false
        })

        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Product saved successfully.')

          this.props.history.push(admin.productList.path)
        }
      })
      .catch(error => {
        this.props.messageShow(error + 'There was some error. Please try again.')

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


  onUpload = (event) => {
    this.props.messageShow('Uploading file, please wait...')

    this.setState({
      isLoading: true
    })

    let data = new FormData()
    data.append('file', event.target.files[0])

    // Upload image
    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          this.props.messageShow('File uploaded successfully.')

          let product = this.state.product
          product.image = `/images/uploads/${response.data.file}`

          this.setState({
            product
          })
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

  displayCategory(category) {
    if (category == null)
      return ("")
    else {
      var result = "";
      var i = 0;
      if (category.node) {
        for (i = 0; i < char_count(category.node, '.'); i++) {
          //tabulation
          result += "--"
        }

        result += " " + category.name
        return (

          result
        )
      }
    }

  }


  render() {
    console.log(this.state)

    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Product / Create or Edit - Admin - Crate</title>
        </Helmet>

        {/* Top menu bar */}
        <ClientMenu />

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'left' }}>
              <Link to={admin.productList.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Product list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                {this.props.match.params.id === undefined ? 'Create' : 'Edit'} Product
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
                    value={this.state.product.name}
                    onChange={this.onChange}
                  />

                  {/* Description */}
                  <Textarea
                    fullWidth={true}
                    placeholder="Description"
                    required="required"
                    name="description"
                    value={this.state.product.description}
                    onChange={this.onChange}
                    style={{ marginTop: '1em' }}
                  />



                  {/* Type 
                  <Select
                    fullWidth={true}
                    required="required"
                    name="type"
                    value={this.state.product.type}
                    onChange={this.onChangeSelect}
                    style={{ marginTop: '1em' }}
                  >
                    {
                      this.state.productTypes.length > 0
                        ?
                        this.state.productTypes.map(type => (
                          <option value={type.id} key={type.id}>{type.name}</option>
                        ))
                        :
                        <option disabled="disabled" selected="selected">Select type</option>
                    }
                  </Select>
*/}
                  {/* Price */}
                  <Input
                    type="text"
                    fullWidth={true}
                    placeholder="Price"
                    required="required"
                    name="price"
                    autoComplete="off"
                    value={this.state.product.price}
                    onChange={this.onChange}
                  />

                      {/* Transaction Types */}
                  <Select
                    fullWidth={true}
                    required="required"
                    name="transactionType"
                    value={this.state.product.transactionType}
                    onChange={this.onChangeSelect}
                    style={{ marginTop: '1em' }}
                  >
                    {
                      this.state.transactionTypes.length > 0
                        ?
                        this.state.transactionTypes.map(transactionType => (
                          <option value={transactionType.id} key={transactionType.id}>{transactionType.name}</option>
                        ))
                        :
                        <option > </option>
                    }
                  </Select>
   {/*  END transaction Types select*/}

                   {/* Gender 
                  <Select
                    fullWidth={true}
                    required="required"
                    name="gender"
                    value={this.state.product.gender}
                    onChange={this.onChangeSelect}
                    style={{ marginTop: '1em' }}
                  >
                    {
                      this.state.userGenders.length > 0
                        ?
                        this.state.userGenders.map(gender => (
                          <option value={gender.id} key={gender.id}>{gender.name}</option>
                        ))
                        :
                        <option disabled="disabled" selected="selected">Select gender</option>
                    }
                  </Select>
*/}
                  {/* category */}
                  <p>Categories</p>


                  {
                    this.state.categories.length > 0
                      ?
                      this.state.categories.map(c => (
                        <div key={c.id}>
                          { this.productHasCategory(c.id) ?
                            <div>
                              <input onChange={this.onChangeCheckbox} type="checkbox" name="productcategories.category.id[]" value={c.id} checked
                              /><span>{this.displayCategory(c)}</span>
                            </div>
                            :
                            <div>
                              <input onChange={this.onChangeCheckbox} type="checkbox" name="productcategories.category.id[]" value={c.id} /><span>{this.displayCategory(c)}</span>
                            </div>
                          }
                        </div>


                      ))
                      :
                      ''


                  }


                  {/* Upload File */}
                  <div style={{ marginTop: '1em' }}>
                    <input
                      type="file"
                      onChange={this.onUpload}
                      required={this.state.product.id === 0}
                    />
                  </div>

                  {/* Uploaded image */}
                  {renderIf(this.state.product.image !== '', () => (
                    <img src={routeImage + this.state.product.image} alt="Product Image"
                      style={{ width: 200, marginTop: '1em' }} />
                  ))}
                </div>



                {/* Form submit */}
                < div style={{ marginTop: '2em', textAlign: 'center' }}>
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
  productCreateOrUpdate: PropTypes.func.isRequired,
  getProductById: PropTypes.func.isRequired,
  getProductTypes: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getUserGenders: PropTypes.func.isRequired,
  getTransactionTypes: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
  productCreateOrUpdate,
  getProductById,
  getProductTypes,
  getCategoryList,
  getUserGenders,
  getTransactionTypes,
  upload,
  messageShow,
  messageHide
})(CreateOrEdit))
