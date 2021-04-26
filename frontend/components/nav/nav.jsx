import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from "../../actions/session_actions";
import { values, reverse } from "lodash";
import { connect } from "react-redux";

const Nav = (props) => {
  return (
    <div id="nav-bar-parent">
      <div id="nav-bar">
        <div className="nav-box" id="nav-dashboard">
          <Link to="/orders/">My Orders</Link>
        </div>
        <div className="nav-box" id="nav-create">
          <Link to="/orders/create">Create Order</Link>
        </div>
        {/* <div className="nav-box" id="recent-orders">
          Recent Orders
          <ul className="header-notifications">
            {props.orders.slice(0, 5).map((order) => {
              return (
                <li>
                  <Link to={`/orders/${order.id}`}>{order.order_number}</Link>
                </li>
              );
            })}
          </ul>
        </div> */}
        <div className="nav-box nav-hover" id="recent-orders">
          Recent Orders
          <ul className="header-notifications">
            {props.orders.slice(0,5).map((order) => {
              return (
                <li>
                  <Link to={`/orders/${order.id}`}>{order.orderNumber}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="nav-box" id="nav-friend" onClick={props.logout}>
          Log Out
        </div>
      </div>
    </div>
  );
};



const mapStateToProps = (state) => ({
  errors: state.errors,
  orders: reverse(values(state.entities.orders))
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
