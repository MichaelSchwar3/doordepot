import { RECEIVE_ORDER, RECEIVE_ORDERS } from "../actions/order_actions";

const doorListingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return action.payload.doorListings
    default:
      return state;
  }
};

export default doorListingsReducer;