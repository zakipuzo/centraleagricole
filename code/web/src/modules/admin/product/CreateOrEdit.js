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
  createOrUpdate as productCreateOrUpdate,
  getTypes as getProductTypes,
  getById as getProductById,
  getTransactionTypes
} from '../../product/api/actions'

import {
  getcategories as getCategoryList
} from '../../category/api/actions'
import { getGenders as getUserGenders } from '../../user/api/actions'
import { upload, messageShow, messageHide } from '../../common/api/actions'


import AdminMenu from '../common/Menu'
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
        transactionType: 0,
        image: '',
        categories: [],
        productImages: []
      },
      transactionTypes: [],
      productTypes: [],
      userGenders: [],
      categories: [],
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

    // get transaction types

     
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

          this.getTransactions();
      
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


  getTransactions= () =>{
        this.props.getTransactionTypes()
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          console.log(this.state.product.id)
          if (this.state.product.id > 0) {
          
            let product = this.state.product
            
            product.transactionType = product.transactionType.id
           
            this.setState({
              product,
              transactionTypes: response.data.data.transactionTypes,
         
            })
          }
          else {
            let product = this.state.product
            
            product.transactionType = response.data.data.transactionTypes[0].id
            this.setState({
              product,
              transactionTypes: response.data.data.transactionTypes,
            })

          }


        }
      })
      .catch(error => {
        this.props.messageShow('There was some error fetching transaction types. Please try again.')
      })
  }

  /// find id category exists in productCategory
  productHasCategory = (id) => {
    var categories = this.state.product.categories;
    var bool = false;
    for (var i = 0; i < categories.length; i++) {

      if (categories[i].id === id) {
        bool = true;
        break;
      }
      else {
        bool = false;
      }
    }

    return bool;
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
    product.transactionType = parseInt(event.target.value)

    this.setState({
      product
    })
  }
/*
  ///onChange checkbox FOR MULTI CATEGORIES 
  onChangeCheckbox = (event) => {
    //khdama push

    var product = this.state.product;
    if (event.target.checked) {
      product.categories.push({ id: parseInt(event.target.value) })
    }
    else {

      ///forEach does not have break instruction 
      var BreakException = {};
      try {
        product.categories.forEach((cat, index) => {
          if (cat.id == parseInt(event.target.value)) {
            product.categories.splice(index, 1);
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
*/

//on change category for one single catégory per product

onChangeCheckbox = (event) => {
  //khdama push
  var product = this.state.product;
  if (event.target.checked) {
    console.log("hhh")

    product.categories=[];
    product.categories.push({ id: parseInt(event.target.value) })
  }
  else {
    console.log("sss")

    product.categories=[];
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
    data.append('files', event.target.files[0])

    // Upload image
    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          this.props.messageShow('File uploaded successfully.')

          let product = this.state.product
          console.log(response.data.files[0].filename)
          product.image = `/images/uploads/${response.data.files[0].filename}`
         
          
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


  onUploads = (event) => {
    this.props.messageShow('Uploading file, please wait...')

    this.setState({
      isLoading: true
    })

    let data = new FormData()
    data.append('files', event.target.files[0])
    data.append('files', event.target.files[1])
    data.append('files', event.target.files[2])
    data.append('files', event.target.files[3])

    // Upload image
    this.props.upload(data)
      .then(response => {
        if (response.status === 200) {
          this.props.messageShow('File uploaded successfully.')
          let product = this.state.product
          if(response.data.files!=null){
              response.data.files.forEach(file => {
                product.productImages.push({ image: `/images/uploads/${file.filename}`})
              }); 
          }


          this.setState({
            product
          })
          console.log(response.data)

      
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
        <AdminMenu />

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
                    defaultValue={this.state.product.name}
                    onChange={this.onChange}
                  />

                  {/* Description */}
                  
                  <Textarea
                    fullWidth={true}
                    placeholder="Description"
                    required="required"
                    name="description"
                    defaultValue={this.state.product.description}
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
                    defaultValue={this.state.product.price}
                    onChange={this.onChange}
                  />

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

                  {/* Transaction Type  */}
                  <p>Transaction Type</p>
                  <Select
                    fullWidth={true}
                    required="required"
                    value={this.state.product.transactionType}
                    name="transactionType" 
                    onChange={this.onChangeSelect}
                    style={{ marginTop: '1em', marginBottom: '1em' }}
                  >
                    {
                      this.state.transactionTypes.length > 0
                        ?
                        this.state.transactionTypes.map(trType => (
                          <option value={trType.id} key={trType.id}>{trType.name}</option>
                        ))
                        :
                        <option disabled="disabled" >Select Transaction</option>
                    }
                  </Select>
                  {/* END Transaction Type  */}

                  {/* category */}
                  <p>Categories {this.state.product.categories.length>0 ? "1" : "0" }</p>
                  


                  {
                    this.state.categories.length > 0
                      ?
                      this.state.categories.map(c => (
                        <div key={c.id}>
                           
                          
                          { 
                          c.isActive ?
                            
                            <div>
                              <input onChange={this.onChangeCheckbox} value={c.id} checked={this.productHasCategory(c.id)} type="checkbox" name="categories.category.id[]"   
                              /><span>{this.displayCategory(c)}</span>
                            </div>
                            
                            :
                            <span>{this.displayCategory(c)}</span>
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

                    {/* Upload Other images */}
                     <div style={{ marginTop: '1em', textAlign: "center" }}>
                    <input
                      type="file"
                      onChange={this.onUploads}
                      required={this.state.product.id === 0}
                      multiple={true}
                    />
                  </div>
                   {/* Uploaded Other image */}
                   <div style={{ marginTop: '1em', textAlign: "center" }}>
                     {this.state.product.productImages.length}
                   {this.state.product.productImages && renderIf(this.state.product.productImages.length>0 , () => (
                 this.state.product.productImages.map((prodimage)=>(
                        <img key={prodimage.id} src={routeImage + prodimage.image} alt="Product Image"
                  style={{ width: 200, marginTop: '1em' }} />
                 ))
                   )
                   )
                }

            
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
  getTransactionTypes: PropTypes.func.isRequired,
  getProductTypes: PropTypes.func.isRequired,
  getCategoryList: PropTypes.func.isRequired,
  getUserGenders: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
  productCreateOrUpdate,
  getProductById,
  getProductTypes,
  getTransactionTypes,
  getCategoryList,
  getUserGenders,
  upload,
  messageShow,
  messageHide
})(CreateOrEdit))
