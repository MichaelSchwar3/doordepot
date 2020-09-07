import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";
import styled from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const OrderIndexItem = props => {
  if (!props.order) return null;
  const order = props.order;
  return (
    <Link to={`/orders/${order.id}`}>
      <Row>
        <span>
          Order Number {order.orderNumber} {order.poNumber ? ` - PO# - ${order.poNumber}` : ""}
        </span>
        <span>{formatDate(order.createdAt)}</span>
      </Row>
    </Link>
  );
};

export default OrderIndexItem;