// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import { H3, H4 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'

// App Imports
import { getList as getUserMessages } from './api/actions'
import Loading from '../common/Loading'
import EmptyMessage from '../common/EmptyMessage'
import MessageItem from './Item'
import { Link } from 'react-router-dom'
import { routeApi, routes } from '../../setup/routes'
import Button from '../../ui/button'

// Component
class List extends PureComponent {

  // Runs on server only for SSR
  static fetchData({ store }) {
    return store.dispatch(getUserMessages())
  }

  // Runs on client only
  componentDidMount() {
    this.props.getUserMessages()
  }


  render() {

    console.log(this.props)
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>La centrale agricole - Message</title>
        </Helmet>

        {/* Top title bar */}
        <Grid style={{ backgroundColor: grey }}>
          <GridCell style={{ padding: '2em', textAlign: 'center' }}>
            <H3 font="secondary">Messages</H3>

          </GridCell>
        </Grid>
    
        {/* Message list */}
        <Grid style={{maxWidth: "1000px", margin: "0 auto"}}>

          <GridCell>
            {
              this.props.messages.isLoading
                ? <Loading />
                : this.props.messages.list.length > 0
                  ?

                  this.props.messages.list.map(message => (
                    <Link key={message.id} to={routes.discussion.path(message.discussionCode)} >
                     
                    <div  style={{ margin: '0.5em', backgroundColor: ( !message.isSeen && message.sender.email!=this.props.user.details.email  ?  "#e8e3e3"  : "white") }} className="messageItem" >
                   
                        <H4 font="secondary" style={{ color: "black" }}>
                        {message.sender.email != this.props.user.details.email
                        ?
                          message.sender.name
                          :
                          message.receiver.name
                      }
                          </H4>

                        <p style={{ color: grey2, marginTop: '1em' }}>{message.content}</p>
                  
                    </div>
                    </Link>
                  ))


                  :
                  <EmptyMessage message="No messages to show" />
            }
          </GridCell>
        </Grid>
        <style jsx>
         { `
         .messageItem:hover{
           background-color: green
         }
          `}
        </style>
      </div>
    )
  }
}

// Component Properties
List.propTypes = {
  user: PropTypes.object,
  messages: PropTypes.object.isRequired,
  getUserMessages: PropTypes.func.isRequired,
}

// Component State
function listState(state) {
  return {
    messages: state.messages,
    user: state.user
  }
}

export default connect(listState, { getUserMessages })(List)
