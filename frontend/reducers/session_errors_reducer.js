// import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER } from '../actions/session_actions';

const sessionErrorsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    default:
      return state;
  }
};

export default sessionErrorsReducer;
