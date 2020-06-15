import { RECEIVE_DOOR, RECEIVE_DOORS } from "../actions/door_actions";
import { RECEIVE_ORDER } from "../actions/order_actions";


const doorsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ORDER:
      return action.payload.doors ? action.payload.doors : state;
    case RECEIVE_DOOR:
      return Object.assign({}, state, {
        [action.door.id]: action.door,
      });
    case RECEIVE_DOORS:
      return action.doors;
    default:
      return state;
  }
};

export default doorsReducer;
