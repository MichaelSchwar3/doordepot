import { RECEIVE_ORDER, RECEIVE_ORDERS } from "../actions/order_actions";
import { RECEIVE_FRAME_LISTING } from "../actions/frame_listing_actions";

const frameListingsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return action.payload.frameListings || state;
    case RECEIVE_FRAME_LISTING:
      const newState = Object.assign({}, state, {[action.frameListing.id] : action.frameListing})
      return newState;
    default:
      return state;
  }
};

export default frameListingsReducer;