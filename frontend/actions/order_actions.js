import * as APIUtil from "../util/order_api_util";

export const RECEIVE_ORDER = "RECEIVE_ORDER";
export const RECEIVE_ORDERS = "RECEIVE_ORDERS";
export const RECEIVE_ORDER_ERRORS = "RECEIVE_ORDER_ERRORS";

export const receiveOrder = order => {
  return {
    type: RECEIVE_ORDER,
    payload: order
  };
};

export const receiveOrders = orders => {
  return {
    type: RECEIVE_ORDERS,
    orders
  };
};



export const receiveOrderErrors = errors => {
  return {
    type: RECEIVE_ORDER_ERRORS,
    errors
  };
};

export const submitOrder = order => dispatch =>
  APIUtil.submitOrder(order).then(
    order => dispatch(receiveOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchOrders = () => dispatch => {
  return APIUtil.fetchOrders().then(
    orders => {
      return dispatch(receiveOrders(orders));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

export const fetchOrder = (orderId) => dispatch => {
  return APIUtil.fetchOrder(orderId).then(
    order => {
      return dispatch(receiveOrder(order));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

