import React from "react";
import { fade, makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import product from '../../../setup/routes/product'
import { primary as primaryGradient } from '../../../ui/common/gradients'

import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Icon from "../../../ui/icon";
import Logo from "./Logo";

//routes
import category from '../../../setup/routes/category'
import user from '../../../setup/routes/user'
import admin from '../../../setup/routes/admin'
import client from '../../../setup/routes/client'
import { Link } from "react-router-dom";
import ToolItem from './MenuItem'
import { Container } from "@material-ui/core";
import { routes } from "../../../setup/routes";
const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  drawermenu: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class ToolbarComponent extends React.Component {
  state = {
    anchorEl: false,
    MobileMoreAnchorEl: false,
    notificationsMenu: false,
  };
  

  handleProfileMenuOpen = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleMobileMenuClose = () => {
    this.setState({
      mobileMoreAnchorEl: null
    });
  };

  handleNotificationsMenuOpen = event => {
    this.setState({
      notificationsMenu: event.currentTarget
    });
  };

  handleMenuClose = () => {
    this.setState({
      anchorEl: null,
      mobileMoreAnchorEl: null,
      notificationsMenu: null
    });
  };

  handleMobileMenuOpen = event => {
    this.setState({
      mobileMoreAnchorEl: event.currentTarget
    });
  };

  render() {
    console.log(this.props.notSeenMsgCount)
    const { classes } = this.props;
    const isMenuOpen = Boolean(this.state.anchorEl);
    const isMobileMenuOpen = Boolean(this.state.mobileMoreAnchorEl);
    const isNotificationMenuOpen = Boolean(this.state.notificationsMenu);

    const menuId = "primary-search-account-menu";
    const renderMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        getContentAnchorEl={null} //*to make vertical work
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        disableScrollLock={true}
      >
        <Link to={user.saved.path}>  <MenuItem onClick={this.handleMenuClose}>Saved Product</MenuItem></Link>
        <Link to={user.profile.path}> <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem></Link>
        <Link to={user.profile.path}>  <MenuItem onClick={this.handleMenuClose}>My account</MenuItem></Link>

      </Menu>
    );

    const menuNotificationsId = "notifications-menu";

    const renderNotificationsMenu = (
      <Menu
        anchorEl={this.state.notificationsMenu}
        getContentAnchorEl={null} //*to make vertical work
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        id={menuNotificationsId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isNotificationMenuOpen}
        onClose={this.handleMenuClose}
      >
        <p>
          ksdlkfbsdlfkbsdlkb
        </p>
      </Menu>
    );

    const mobileMenuId = "primary-search-account-menu-mobile";
    const renderMobileMenu = (
      <Menu
        anchorEl={this.state.mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <Link to={routes.messages.path}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={this.props.notSeenMsgCount} color="secondary">
                <Icon >mail</Icon>
              </Badge>
            </IconButton>
          </Link>
          <p>Messages</p>
        </MenuItem>
        <MenuItem onClick={this.handleNotificationsMenuOpen}>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <Icon >notifications</Icon>
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >

            <Icon >account_box</Icon>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.grow}>
        <AppBar style={{
          backgroundImage: primaryGradient,
          zIndex: 1000,
          padding: '0 0em',
          position: 'fixed',
          height: "5em",
          left: 0,
          right: 0,
          top: 0
        }} position="static">

          <Toolbar
            style={{
              height: "100%"
            }}
          >
            <IconButton
              edge="start"
              className={classes.menuButton, classes.drawermenu}
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.openDrawerHandler}
            >
              <Icon >menu</Icon>
            </IconButton>
            <div>
              <Typography variant="h6" noWrap className={classes.title} >
                <Logo name="LCA"  />
              </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

              {/*  <MenuItem to={home.men.path}>Men</MenuItem> */}

              {/* <MenuItem to={home.women.path}>Women</MenuItem> */}

              {/*  <MenuItem to={home.howItWorks.path}>How It Works</MenuItem> <MenuItem to={home.whatsNew.path}>Products</MenuItem> */}
              <Typography className={classes.title} noWrap >

                <ToolItem to={product.offers.path}>Offers</ToolItem >


                <ToolItem to={product.demands.path}>Demands</ToolItem >


                <ToolItem to={category.listCat.path}>Catégories</ToolItem >
              </Typography>
              {/* Right menu */}
              <Typography className={classes.title} noWrap >



                {
                  this.props.user.isAuthenticated
                    ?
                    <>
                      {this.props.user.details.role === 'ADMIN' && <ToolItem to={admin.dashboard.path} section="admin">Dashboard</ToolItem>}
                      {this.props.user.details.role === ' ' && <ToolItem to={client.dashboard.path} section="client">My Shop</ToolItem>}

                      {/*<MenuItem to={crate.list.path}>Crates</MenuItem>

    <MenuItem to={user.subscriptions.path}>Subscriptions</MenuItem> */}


                      <ToolItem to={user.cart.path}> <Icon size={1.2} style={{ color: "white" }}>shopping_cart</Icon></ToolItem>

                    </>
                    :

                    <>
                      <ToolItem to={user.login.path}>Login</ToolItem>

                      <ToolItem to={user.signup.path}>Signup</ToolItem>
                    </>
                }
              </Typography>

            </div>


            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Link to={routes.messages.path}>
                <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={this.props.notSeenMsgCount} color="secondary">
                    <Icon >mail</Icon>
                  </Badge>
                </IconButton>
              </Link>

              <IconButton
                color="inherit"

                aria-label="show 17 new notifications"
                aria-controls={menuNotificationsId}
                aria-haspopup="true"
                onClick={this.handleNotificationsMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <Icon >notifications</Icon>
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Icon >account_box</Icon>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <Icon >more_vert</Icon>
              </IconButton>
            </div>
          </Toolbar>

        </AppBar>
        {renderMobileMenu}
        {renderNotificationsMenu}
        {renderMenu}
      </div>
    );
  }
}

export default withStyles(styles)(ToolbarComponent);
