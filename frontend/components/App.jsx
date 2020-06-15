import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Route, Link, Switch } from "react-router-dom";
import LoginForm from './session/login_form';
import DoorOrderForm from './forms/door_order_form';
import OrderForm from './forms/order_form';
import DoorListingForm from './forms/door_listing_form';
import OrderIndex from './orders/order_index';
import Order from './orders/order';
import Nav from "./nav/nav";
const App = () => (
  <div>
    {/* <Route path="/" component={Header} /> */}
    {/* <AuthRoute exact path="/signup" component={SignupContainer} /> */}
    <AuthRoute exact path="/login" component={LoginForm} />
    <ProtectedRoute path="/" component={Nav} />
    {/* <ProtectedRoute path="/orders/create" component={DoorOrderForm} /> */}
    <ProtectedRoute exact path="/orders" component={OrderIndex} />
    <ProtectedRoute exact path="/orders/create" component={OrderForm} />
    <ProtectedRoute exact path="/orders/:orderId/" component={Order} />
    <ProtectedRoute exact path="/orders/:orderId/doorListings/create/" component={DoorListingForm} />
    <ProtectedRoute exact path="/doorListings/:doorListingId/create" component={DoorOrderForm} />
    <ProtectedRoute exact path="/doorListings/:doorListingId/door/:doorId" component={DoorOrderForm} />
    {/* <Switch> */}
    {/* <ProtectedRoute path="/cards/new" component={CardForm} /> */}
    {/* <ProtectedRoute path="/cards" component={CardIndex} /> */}
    {/* </Switch> */}
  </div>
);

export default App;