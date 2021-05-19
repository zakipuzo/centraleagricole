
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
import { getList as getCategoryList, remove as removeCategory } from '../../category/api/actions'
import { messageShow, messageHide } from '../../common/api/actions'
import Loading from '../../common/Loading'
import EmptyMessage from '../../common/EmptyMessage'
import AdminMenu from '../common/Menu'
import { routeImage } from '../../../setup/routes'
import admin from '../../../setup/routes/admin'

// Component
class List extends PureComponent {

    // Runs on server only for SSR
    static fetchData({ store }) {
        return store.dispatch(getCategoryList())
    }

    // Runs on client only
    componentDidMount() {
        this.props.getCategoryList()
    }
    remove = (id) => {
        if (id > 0) {
            let check = confirm('Are you sure you want to delete this category?')

            if (check) {
                this.props.messageShow('Deleting, please wait...')

                this.props.removeCategory({ id })
                    .then(response => {
                        if (response.status === 200) {
                            if (response.data.errors && response.data.errors.length > 0) {
                                this.props.messageShow(response.data.errors[0].message)
                            } else {
                                this.props.messageShow('Category deleted successfully.')

                                this.props.getCategoryList(false)
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

    //display subcategories if exists
    displayParentCategory(cat) {
        if (cat == null) {
            return (<span>uncategorized</span>);
        }
        else {
            return (cat.name);
        }
    }

    render() {
        const { isLoading, list } = this.props.categories

        return (
            <div>
                {/* SEO */}
                <Helmet>
                    <title>Categories - Admin - Crate</title>
                </Helmet>

                {/* Top menu bar */}
                <AdminMenu />

                {/* Page Content */}
                <div>
                    {/* Top actions bar */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell style={{ textAlign: 'right' }}>
                            <Link to={admin.categoryCreate.path}>
                                <Button theme="secondary" style={{ marginTop: '1em' }}>
                                    <Icon size={1.2} style={{ color: white }}>add</Icon> Add
                </Button>
                            </Link>
                        </GridCell>
                    </Grid>

                    {/* Category list */}
                    <Grid alignCenter={true} style={{ padding: '1em' }}>
                        <GridCell>
                            <table className="striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Parent</th>
                                        <th>Active</th>
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
                                                    <Loading message="loading categories..." />
                                                </td>
                                            </tr >
                                            : list.length > 0
                                                ? list.map(({ id, name, category, isActive, createdAt, updatedAt }) => (
                                                    <tr key={id}    >

                                                        <td>
                                                            {name}
                                                        </td>

                                                        <td>
                                                            {this.displayParentCategory(category)}
                                                        </td>
                                                        <td>
                                                            {isActive ?  "true" : "false"}
                                                        </td>

                                                        <td>
                                                            {new Date(parseInt(createdAt)).toDateString()}
                                                        </td>

                                                        <td>
                                                            {new Date(parseInt(updatedAt)).toDateString()}
                                                        </td>

                                                        <td style={{ textAlign: 'center' }}>
                                                            <Link to={admin.categoryEdit.path(id)}>
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
                                                        <EmptyMessage message="No categories to show." />
                                                    </td>
                                                </tr>
                                    }
                                </tbody>
                            </table>
                        </GridCell>
                    </Grid>
                </div>
                <style jsx>
                    {`
                    .isActive{
                        background-color: green !important
                    }
                    `}
                </style>
            </div>
        )
    }
}

// Component Properties
List.propTypes = {
    categories: PropTypes.object.isRequired,
    getCategoryList: PropTypes.func.isRequired,
    removeCategory: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
    messageHide: PropTypes.func.isRequired
}



// Component State
function listState(state) {
    return {
        categories: state.categories
    }
}

export default connect(listState, { getCategoryList, removeCategory, messageShow, messageHide })(List)