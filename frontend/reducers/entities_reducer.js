import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import formsReducer from "./forms/forms_reducer";
import ordersReducer from "./orders_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  forms: formsReducer,
  orders: ordersReducer
});

export default entitiesReducer;
