import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";

const DoorListingRow = props => {
  if (!props.doorListing) return null;
  const doorListing = props.doorListing;
  return (
    <div id="workout-item">
      <Link to={`/doorListings/${doorListing.id}`}>
        <h1>Door Listing</h1><br/>
        <div id="workout-item-front">
          <span>
            Skid Up: {doorListing.skidUp ? "True" : "False"}
          </span>
          <span>
            Deliver: {doorListing.deliver ? "True" : "False"}
          </span>
          <span>Created at: {formatDate(doorListing.createdAt)}</span>
          <span>Date Required: {doorListing.dateRequired ? formatDate(doorListing.dateRequired) : "No date"}</span>
        </div>
      </Link>
    </div>
  );
};

export default DoorListingRow;