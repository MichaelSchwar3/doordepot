import { combineReducers } from "redux";
import DoorFormReducer from './door_form_reducer';

const formsReducer = combineReducers({
  doorForm: DoorFormReducer,
});

export default formsReducer;
