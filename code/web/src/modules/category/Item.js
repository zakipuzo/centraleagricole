// Imports
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

// UI Imports
import Card from '../../ui/card/Card'
import Button from '../../ui/button/Button'
import H4 from '../../ui/typography/H4'
import Icon from '../../ui/icon'
import { white, grey2, black } from '../../ui/common/colors'

// App Imports
import { APP_URL } from '../../setup/config/env'
import userRoutes from '../../setup/routes/user' 
// App Imports
import categoryRoute from '../../setup/routes/category'

import { char_count } from '../../setup/helpers'
// Component
class Item extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      
    }
  }

  numberSpaces(category){
  var number=[];
    
  
    for(let i=0;i<char_count(category.node,'.')*4;i++){
       number.push("&nbsp;");
    }
 return number;
  }


  render() {
  
    const { isLoading } = this.state
    return (
      
        <Card style={{  height: "100%"}} >
          {
            /*loop*/
            this.props.categories.map(category=>(
              <Link key={category.id} to={categoryRoute.detailsCat.path(category.id)}>
                
              <div key={category.id}>
              
              <H4 font="secondary" style={{  color: "black", fontSize: (1+1/(char_count(category.node,'.')+1))+"em" }}>
                
                {
                  this.numberSpaces(category).map((n,index)=>(
                    
                     <span key={index}>&nbsp;</span> 
                    
                  )
                  )
                }
                {
                  category.name
                }
              
              
              
              </H4>
  
              <p style={{ color: grey2, marginTop: '1em' }}></p>
  
            </div>
            </Link>
            ))
          }
         
        </Card>
     )
  }
}

// Component Properties

Item.propTypes = {
  categories: PropTypes.array.isRequired, 
}

// Component State
function itemState(state) {
  return {
    user: state.user
  }
}

export default connect(itemState, {  })(withRouter(Item))
