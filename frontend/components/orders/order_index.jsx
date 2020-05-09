import React from "react";
import { connect } from "react-redux";
import OrderIndexItem from "./order_index_item";
import { fetchOrders } from '../../actions/order_actions'
import { Link } from "react-router-dom";
import { isEmpty, values } from 'lodash';

class OrderIndex extends React.Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    if(isEmpty(this.props.orders)) return null;
    const indexOrders = values(this.props.orders);
    return (
      <div className="workouts-index">
        <div id="workouts-create">
          <span>My Orders</span>
          <Link to="/orders/create/">
            <button id="workouts-create-workout">Create an order</button>
          </Link>
        </div>
        <div id="workout-items">
          {indexOrders.map(order => {
            return (
              <OrderIndexItem
                order={order}
                key={`order-${order.id}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
  orders: state.entities.orders
});

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderIndex);
