// Imports
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { routeImage } from "../../setup/routes";
// UI Imports
import Card from "../../ui/card/Card";
import Button from "../../ui/button/Button";
import H4 from "../../ui/typography/H4";
import Icon from "../../ui/icon";
import { white, grey2, black } from "../../ui/common/colors";

// App Imports
import { APP_URL } from "../../setup/config/env";
import { messageShow, messageHide } from "../common/api/actions";
import { remove, getCartByUser } from "../cart/api/actions";

// Component
class Item extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  onClickRemoveFromCart = (id) => {
    let check = confirm(
      "Are you sure you want to remove this product from cart?"
    );

    if (check) {
      this.setState({
        isLoading: true,
      });

      this.props.messageShow("removing product, please wait...");

      this.props
        .remove({ id })
        .then((response) => {
          if (response.data.errors && response.data.errors.length > 0) {
            this.props.messageShow(response.data.errors[0].message);
          } else {
            this.props.messageShow("removed successfully.");

          }
        })
        .catch((error) => {
          this.props.messageShow(
            "There was some error removing  this product from cart. Please try again."
          );
        })
        .then(() => {
          this.setState({
            isLoading: false,
          });

          window.setTimeout(() => {
            this.props.messageHide();
          }, 5000);
        });
    }
  };

  render() {
    const cartitem = this.props.cart;
    const { isLoading } = this.state;

    return (
      <div style={{ margin: "0 auto", width: "80vh", backgroundColor: white }}>
         <td >
          <img
            src={`${routeImage}` + cartitem.product.image}
            alt={cartitem.product.name}
            style={{ width: "100px", height: "100px" }}
          />
        </td>

        <td style={{ padding: "1em 1.2em", float: "left" }}>
          <H4 font="secondary" style={{ color: black }}>
            {cartitem.product.name}
          </H4>
        </td>

        <td style={{ padding: "1em 1.2em", float: "left" }}>
          
            Quantity
            <input type="number" value={cartitem.quantity}></input>
          
        </td>

        <td style={{ padding: "1em 1.2em", float: "left" }}>
         
            <Button
              theme="secondary"
              onClick={this.onClickRemoveFromCart.bind(this, cartitem.id)}
              type="button"
              disabled={isLoading}
            >
              <Icon size={1.2} style={{ color: white }}>
                remove_circle_outline
              </Icon>{" "}
              Remove
            </Button>
       
            added on {new Date(parseInt(cartitem.createdAt)).toDateString()}
    </td>
      </div>
    );
  }
}

// Component Properties
Item.propTypes = {
  cart: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  getCartByUser: PropTypes.func.isRequired,
  messageShow: PropTypes.func.isRequired,
  messageHide: PropTypes.func.isRequired,
};

// Component State
function itemState(state) {
  return {
    user: state.user,
  };
}

export default connect(itemState, {
  remove,
  getCartByUser,
  messageShow,
  messageHide,
})(withRouter(Item));
