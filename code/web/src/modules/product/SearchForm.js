// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, Redirect, withRouter } from 'react-router-dom'
import { routes } from '../../setup/routes'
import Button from '../../ui/button'
import Icon from '../../ui/icon'
import { connect } from 'react-redux'
import { getcategories as getCategoryList } from '../category/api/actions'
import { getTransactionTypes } from './api/actions'
import { Select, MenuItem, InputLabel, TextField } from '@material-ui/core'
import { char_count } from '../../setup/helpers'


// Component
class SearchForm extends Component {

    constructor(props) {
        super(props)
        // this state for create new category
        this.state = {
            search: {
                searchString: props.searchstring != undefined ? props.searchstring : "",
                categoryId: props.categoryId != undefined ? props.categoryId : 0,
                transactionType: props.transactionType != undefined ? props.transactionType : 1
            },
            categories: [],
            transactionTypes: [],
            ...props
        }
    }

    componentDidMount() {
        //get all categories
        this.getcategories()
        this.getTransactions()

    }

    getTransactions = () => {
        this.props.getTransactionTypes()
            .then(response => {
                if (response.data.errors && response.data.errors.length > 0) {
                    this.props.messageShow(response.data.errors[0].message)
                } else {

                    this.setState({
                        transactionTypes: response.data.data.transactionTypes,

                    })

                }
            })
            .catch(error => {
                this.props.messageShow('There was some error fetching Transaction TYpes. Please try again.')
            })
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

    onChangeSelect = (event) => {
        let search = this.state.search
        search[event.target.name] = event.target.value
        this.setState({
            search
        })
    }
    onChange = (event) => {
        let search = this.state.search;
        search[event.target.name] = event.target.value;
        this.setState({
            search
        })

    }

    onSubmit = (event) => {
        event.preventDefault();



        this.props.history.push(routes.search.path(this.state.search.searchString, this.state.search.categoryId, this.state.search.transactionType))



    }

    render() {


        console.log(this.state)
        return (
            <div style={{
                backgroundColor: "white"
            }} >
                <form onSubmit={this.onSubmit} >
                    <div style={{  marginBottom: '1em', className: "flex-container"}}>

                        <TextField  className="flex-item" style={{width: "18em", margin:"1em"}}  required label="Search" defaultValue={this.state.search.searchString} name="searchString" onChange={this.onChange} />


                        {/* categories */}
                        <Select
                            name="categoryId"
                            className="flex-item"
                            value={this.state.search.categoryId}
                            onChange={this.onChangeSelect}
                            style={{ margin: '1em' , width: "10em" }}
                        >
                            <MenuItem value="0" selected="selected">All Categories</MenuItem>
                            {
                                this.state.categories.length > 0
                                    ?
                                    this.state.categories.map(category => (
                                        <MenuItem value={category.id} key={category.id}>{this.displayCategory(category)}</MenuItem>
                                    ))
                                    :
                                    <MenuItem value="0" disabled="disabled" selected="selected">No Category</MenuItem>
                            }
                        </Select>
                        {/* transaction type */}
                        <Select
                            name="transactionType"
                            className="search_form_item"
                            value={this.state.search.transactionType}
                            onChange={this.onChangeSelect}
                            style={{ margin: '1em' ,  width: "5em"}}
                        >

                            {
                                this.state.transactionTypes.length > 0
                                    ?
                                    this.state.transactionTypes.map(type => (
                                        <MenuItem value={type.id} key={type.id}> {type.name}</MenuItem>
                                    ))
                                    :
                                    <MenuItem value="0" disabled="disabled" selected="selected">No Category</MenuItem>
                            }
                        </Select>




                        <Button className="flex-item" type="submit" style={{ margin: '1em'}}> <Icon size={3} style={{ color: "black" }}>search</Icon> </Button>


                    </div>

                </form>



                {/* language=CSS */}
                <style jsx>{`
       
        `}
                </style>
            </div>
        )
    }
}
// Component Properties
SearchForm.propTypes = {
    searchString: PropTypes.string,
    getCategoryList: PropTypes.func.isRequired,
    getTransactionTypes: PropTypes.func.isRequired,

}
SearchForm.defaultProps = {
    searchString: '',
}


// Component State
function SearchFormState(state) {
    return {

    }
}

export default withRouter(connect(SearchFormState, {

    getCategoryList,
    getTransactionTypes

})(SearchForm))