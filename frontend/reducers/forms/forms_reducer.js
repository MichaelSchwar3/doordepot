import { combineReducers } from "redux";
import DoorOrderFormsReducer from './door_order_forms_reducer';

const formsReducer = combineReducers({
  doorOrderForm: DoorOrderFormsReducer
});

export default formsReducer;
