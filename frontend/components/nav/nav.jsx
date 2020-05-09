import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return(
    <div id="nav-bar-parent">
      <div id="nav-bar">
        <div className="nav-box" id="nav-dashboard">
          <Link to="/orders/">My Orders</Link>
        </div>
        <div className="nav-box" id="nav-create">
          <Link to="/orders/create">Create Order</Link>
        </div>
        <div className="nav-box" id="nav-log">
          <Link to="/workouts/create">Log Workout</Link>
        </div>
        <div className="nav-box" id="nav-friend">
          <Link to="/people/friends">My Friends</Link>
        </div>
      </div>
    </div>
  );
};
export default Nav;
