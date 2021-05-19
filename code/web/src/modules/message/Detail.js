// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

// UI Imports
import { Grid, GridCell } from '../../ui/grid'
import Card from '../../ui/card/Card'
import { H2, H3, H4 } from '../../ui/typography'
import { grey, grey2 } from '../../ui/common/colors'
import Button from '../../ui/button/Button'
import Icon from '../../ui/icon'

// App Imports
import { routeApi, routeImage, routes } from '../../setup/routes'
import { get, setMessageSeen } from './api/actions'
import Loading from '../common/Loading'
import { messageShow, messageHide } from '../common/api/actions'
import EmptyMessage from '../common/EmptyMessage'
import { message, messages } from './api/state'
import SendMsgForm from './SendMsgForm'



class Detail extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
     msgSent:false
    }
  }



  // Runs on server only for SSR
  static fetchData({ store, params }) {
    return store.dispatch(get(params.discussionCode))
  }


  // Runs on client only
  componentDidMount() {
    this.refresh(this.props.match.params.discussionCode)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.discussionCode !== this.props.match.params.discussionCode) {
      this.refresh(nextProps.match.params.discussionCode)
    }
  }

setMessageSent=()=>{
  this.setState({
    msgSent: true
  })
}

  refresh = (discussionCode) => {
    /*get discussion*/
    this.props.get(discussionCode)
  
    /*set msg seen*/
    this.props.setMessageSeen(discussionCode)
      .then(response => {
        if (response.data.errors && response.data.errors.length > 0) {
          this.props.messageShow(response.data.errors[0].message)
        } else {
        
        }
      })
      .catch(error => {

        this.props.messageShow(error + ' not seen. Please try again.')
      })
  }





  render() {
    const { isLoading, list, error } = this.props.messages
    if(list.length<1){

      this.props.history.push(routes.messages.path)
    }
    console.log(this.props.user)
    console.log(this.props.messages)
    console.log(this.state)
    let receiver = null;
    if (list && list.length > 0) {

      if (list[0].sender.email == this.props.user.details.email)
      receiver = list[0].receiver
      else
      receiver = list[0].sender



    }
 
    return (
      <div>
        <Grid alignCenter={true}>
          <GridCell style={{ textAlign: 'left' }}>
            <Link to={routes.messages.path}>
              <Button><Icon size={1.2}>arrow_back</Icon> Back</Button>
            </Link>
          </GridCell>
          <GridCell style={{ textAlign: 'left' }}>
            <Link to={routes.messages.path}>
    <H4>{receiver!=null ? receiver.name : ""}</H4>
            </Link>
          </GridCell>
        </Grid>
        <Grid style={{ maxWidth: "1000px", margin: "0 auto" }}>

          <GridCell>
            {
              this.props.messages.isLoading
                ? <Loading />
                :

                this.props.messages.list.length > 0
                  ?
                  this.props.messages.list.map(message => (
                    <div key={message.id} style={{ margin: '2em' }}>
                      {
                        message.sender.email == this.props.user.details.email
                          ?

                          <div style={{ textAlign: "right" }}>
                            <div>{message.sender.name}</div>
                            <div>{message.content}</div>
                          </div>
                          :
                          <div style={{ textAlign: "left" }}>
                            <div> {message.sender.name}</div>
                            <div> {message.content}</div>
                          </div>


                      }



                    </div>
                  ))

                  :
                  <EmptyMessage message="No messages to show" />
            }
            <SendMsgForm receiver={receiver} setMessageSent={this.setMessageSent} />
          </GridCell>
        </Grid></div>
    )
  }
}

// Component Properties
Detail.propTypes = {
  messages: PropTypes.object.isRequired,
  user: PropTypes.object,
  get: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired,
  setMessageSeen: PropTypes.func.isRequired,

}

// Component State
function detailState(state) {
  return {
    messages: state.messages,
    user: state.user
  }
}

export default withRouter(connect(detailState, { get, messageShow, messageHide, setMessageSeen })(Detail))

