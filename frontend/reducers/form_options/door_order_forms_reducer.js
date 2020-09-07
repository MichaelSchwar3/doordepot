import { RECEIVE_DOOR_FORM_OPTIONS } from "../../actions/door_order_actions";

const doorOrderFormsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DOOR_FORM_OPTIONS:
      return Object.assign({}, state, action.formOptions);
    default:
      return state;
  }
};

export default doorOrderFormsReducer;