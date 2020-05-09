import React from "react";
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";
import { isEmpty } from 'lodash';
import { fetchOrder} from '../../actions/order_actions';

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
    console.log(this.props.order)
    if (!this.props.order) {return null}
    const order = this.props.order;
    return (
      <div className="workout-show">
        <section id="workout-show-info">
          <div id="wsi-head">
            <div id="wsi-head-title">{order.orderNumber}</div>
            <div id="wsi-head-body">
              <div className="wsi-head-body-obj" id="wsi-head-body-distance">
                <p id="distance">DISTANCE</p>
                <span id="distance-miles">{order.distance}</span>
              </div>
              <div className="wsi-head-body-obj" id="wsi-head-body-duration">
                <span id="duration">DURATION</span>
                <span id="duration-time">{"PlaceHolder"}</span>
              </div>
              <div className="wsi-head-body-obj" id="wsi-head-body-pace">
                <span id="pace">PACE</span>
                <span id="pace-time">PLaceholder</span>
              </div>
            </div>
            <div id="wsi-head-bottom">
              <div id="wsi-head-bottom-icon">&#128100;</div>
              <div id="wsi-head-bottom-info">
                Created at - {formatDate(order.createdAt)}
                <br />
                Last Updated at - {formatDate(order.updatedAt)}
              </div>
            </div>
            <div id="wsi-head-buttons">
              <Link to={`/orders/${order.id}`}>
                <button id="wsi-edit">Add Door Line</button>
              </Link>
              <Link to={`/orders/${order.id}`}>
                <button id="wsi-edit">Add Frame Line</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  errors: state.errors,
  order: state.entities.orders[ownProps.match.params.orderId]
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: (orderId) => dispatch(fetchOrder(orderId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
