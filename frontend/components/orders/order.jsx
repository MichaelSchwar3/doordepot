import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";
import { isEmpty, values } from 'lodash';
import { fetchOrder} from '../../actions/order_actions';
import DoorListingRow from '../doorListings/door_listings_row';

class Order extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchOrder(this.props.match.params.orderId);
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.match.params.orderId !== nextProps.match.params.orderId
    ) {
      this.props.fetchOrder(nextProps.match.params.orderId);
    }
  }

  render() {
    if (!this.props.order) {return null}
    const order = this.props.order;
    return (
      <div className="workout-show">
        <section id="workout-show-info">
          <div id="wsi-head">
            <div id="wsi-head-title">Order Number: {order.orderNumber}</div>
            <div id="wsi-head-body">
              
            </div>
            <div id="wsi-head-bottom">
              <div id="wsi-head-bottom-info">
                <span>Created at - {formatDate(order.createdAt)}</span>

                <span>Last Updated at - {formatDate(order.updatedAt)}</span>
              </div>
            </div>
            <div id="wsi-head-buttons">
              <Link to={`/orders/${order.id}/doorListings/create`}>
                <button id="wsi-edit">Add Door Line</button>
              </Link>
              <Link to={`/orders/${order.id}`}>
                <button id="wsi-edit">Add Frame Line</button>
              </Link>
            </div>
          </div>
        </section>
        <section>
          {this.props.doorListings.map( listing => (
            <DoorListingRow doorListing={listing} />
          ))}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  order: state.entities.orders[ownProps.match.params.orderId],
  doorListings: values(state.entities.doorListings),
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
