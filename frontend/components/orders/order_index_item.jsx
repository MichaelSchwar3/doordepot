import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";

const OrderIndexItem = props => {
  if (!props.order) return null;
  const order = props.order;
  return (
    <div id="workout-item">
      <Link to={`/orders/${order.id}`}>
        <div id="workout-item-front">
          <span>
            Order Number {order.orderNumber} - PO# - {order.poNumber}
          </span>
          <span>{formatDate(order.createdAt)}</span>
        </div>
      </Link>
    </div>
  );
};

export default OrderIndexItem;