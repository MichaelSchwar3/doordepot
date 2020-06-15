import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import formsReducer from "./forms/forms_reducer";
import ordersReducer from "./orders_reducer";
import doorListingsReducer from "./door_listings_reducer";
import doorsReducer from "./doors_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  forms: formsReducer,
  orders: ordersReducer,
  doorListings: doorListingsReducer,
  doors: doorsReducer,
});

export default entitiesReducer;
