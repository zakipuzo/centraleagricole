import React from "react";
import Drawer from "@material-ui/core/Drawer";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography
} from "@material-ui/core";
import Icon from "../../../ui/icon";
//routes
import product from '../../../setup/routes/product'
import category from '../../../setup/routes/category'
import admin from '../../../setup/routes/admin'
import client from '../../../setup/routes/client'

import { Link } from "react-router-dom";
import Logo from "./Logo";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

class DrawerComponent extends React.Component {
  state = {
    left: false
  };

  render() {
    const { classes } = this.props;

    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={this.props.toggleDrawerHandler}
        onKeyDown={this.props.toggleDrawerHandler}
        style={{backgroundColor: "#2a5a4b", height: "100%"}}
      >

        <List>

          <Link to="/">
            <ListItem >
              <Typography variant="h6" noWrap  >
                <Logo name="LCA" />
              </Typography>
            </ListItem>
          </Link>
        </List>
        {
          this.props.user.isAuthenticated
            ?
            <List>
                <Link to={admin.dashboard.path}>
              <ListItem>
              <ListItemIcon>
              <Icon >settings</Icon>
              </ListItemIcon>
                {this.props.user.details.role === 'ADMIN' && <ListItemText primary={"Dashboard"} style={{ color: "black" }} />
                  

                
                }
              </ListItem>
              </Link>
              <Link to={client.clientDashboard.path}>

              <ListItem>
                {this.props.user.details.role === 'USER' && <ListItemText primary={"Shop"} style={{ color: "black" }} />
                }
              </ListItem>
              </Link>
 
            </List>
            :
            <></>
        }
 
        <Divider />
       
        <List>
          <Link to={product.offers.path}>
            <ListItem button >

              <ListItemText primary={"Offers"} style={{ color: "black" }} />

            </ListItem>
          </Link>
          <Link to={product.demands.path}>
            <ListItem button >

              <ListItemText primary={"Demands"} style={{ color: "black" }} />

            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <Link to={category.listCat.path}>
            <ListItem button >

              <ListItemText primary={"Categories"} style={{ color: "black" }} />

            </ListItem>
          </Link>

        </List>
        <Divider />
      </div>
    );

    return (
      <Drawer  open={this.props.left} onClose={this.props.toggleDrawerHandler} disableScrollLock={true}>
        {sideList("left")}
      </Drawer>
    );
  }
}

export default withStyles(styles)(DrawerComponent);
