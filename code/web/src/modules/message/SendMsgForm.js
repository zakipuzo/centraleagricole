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
   
        receiver: props.receiver ? props.receiver : null,
        content : ""
  
    }
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
          this.props.setMessageSent();
        //  this.props.history.push(routes.messages.path)
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
        
          {/* Crate list */}
          <Grid alignCenter={true} style={{ padding: '1em' }}>
            <GridCell>
            
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
