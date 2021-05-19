// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

 

// App Imports
  import {
  create as sendMessage,    
} from './api/actions'
import { messageShow, messageHide } from '../common/api/actions'
 import { getUser } from '../user/api/actions'
import { routes } from '../../setup/routes'
import { Grid, GridCell } from '../../ui/grid'
import Button from '../../ui/button'
import Icon from '../../ui/icon'
import { H4 } from '../../ui/typography'
import { Input, Textarea } from '../../ui/input'

// Component
class SendMsg extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
   
        receiver: {},
        content : ""
  
    }
  }

  componentDidMount() { 
   this.getReceiver(parseInt(this.props.match.params.receiverId))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.receiverId !== this.props.match.params.receiverId) {
      this.getReceiver(parseInt(nextProps.match.params.receiverId))
    }
  }


  getReceiver = (id) => {
 
   this.props.getUser(id)
     .then(response => {
       if (response.data.errors && response.data.errors.length > 0) {
         this.props.messageShow(response.data.errors[0].message)
       } else {
         this.setState({
           receiver: response.data.data.user
         })

       }
     })
     .catch(error => {
       this.props.messageShow(error + ' There was some error fetching categories. Please try again.')
     })

 }

 
  onSubmit = (event) => {
    event.preventDefault()

    this.setState({
      isLoading: true
    })

    this.props.messageShow('Sending message, please wait...')

    // Save crate
    this.props.sendMessage(this.state.receiver.id,this.state.content)
      .then(response => {
        this.setState({
          isLoading: false
        })

        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
          this.props.messageShow('Message sent successfully.')

          this.props.history.push(routes.messages.path)
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
  onChange=(event)=>{
    this.setState({
      content: event.target.value
    })
  }

  render() {
    console.log(this.state)
 
    return (
      <div>
        {/* SEO */}
        <Helmet>
          <title>Send message  </title>
        </Helmet>

       

        {/* Page Content */}
        <div>
          {/* Top actions bar */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell style={{ textAlign: 'left' }}>
              <Link to={routes.messages.path}>
                <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
              </Link>
            </GridCell>
          </Grid>

          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
              <H4 font="secondary" style={{ marginBottom: '1em', textAlign: 'center' }}>
                {this.state.receiver.name}
              </H4>

              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <div style={{ width: '25em', margin: '0 auto' }}>
                 

                  {/* Description */}
                  <Textarea
                    fullWidth={true}
                    placeholder="Messgae"
                    required="required"
                    name="content"
                    defaultValue={this.state.content}
                    onChange={this.onChange}
                    style={{ marginTop: '1em' }}
                  />
                </div>

                {/* Form submit */}
                <div style={{ marginTop: '2em', textAlign: 'center' }}>
                  <Button type="submit" theme="secondary" disabled={this.state.isLoading}>
                    <Icon size={1.2} style={{ color: "white" }}>check</Icon> Send
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
SendMsg.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired
}

export default withRouter(connect(null, {
  sendMessage,
  getUser,
  messageShow,
  messageHide
})(SendMsg))
