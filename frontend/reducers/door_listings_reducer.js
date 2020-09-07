import { RECEIVE_ORDER, RECEIVE_ORDERS } from "../actions/order_actions";
import { RECEIVE_DOOR_LISTING } from "../actions/door_listing_actions";

const doorListingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return action.payload.doorListings || state;
    case RECEIVE_DOOR_LISTING:
      const newState = Object.assign({}, state, {[action.doorListing.id] : action.doorListing})
      return newState;
    default:
      return state;
  }
};

export default doorListingsReducer;