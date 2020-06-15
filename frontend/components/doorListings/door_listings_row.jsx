import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";

import styled from "styled-components";

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  background: ${props => props.color % 2 === 0 ? "#ddd" : "#eee"}
`;


const DoorListingRow = props => {
  if (!props.doorListing) return null;
  const { doorListing, door } = props;
  const url = doorListing.doorId
    ? `/doorListings/${doorListing.id}/door/${door.id}`
    : `/doorListings/${doorListing.id}/create`;

  return (
    <Link to={url}>
      <Row color={doorListing.id}>
        <div>Door Line</div>
        <div>{doorListing.skidUp ? "True" : "False"}</div>
        <div>{doorListing.deliver ? "True" : "False"}</div>
        <div>{formatDate(doorListing.createdAt)}</div>
        <div>
          {doorListing.dateRequired
            ? formatDate(doorListing.dateRequired)
            : "No date"}
        </div>
        <div>{door && door.lhQuantity ? door.lhQuantity : ""}</div>
        <div>{door && door.rhQuantity ? door.rhQuantity : ""}</div>
        <div>
          {door && door.heightFeet
            ? `${door.heightFeet} - ${door.heightInches}`
            : ""}
        </div>
        <div>
          {door && door.widthFeet
            ? `${door.widthFeet} - ${door.widthInches}`
            : ""}
        </div>
        <div>{door && door.doorType ? door.doorType : ""}</div>
        <div>{door && door.frameType ? door.frameType : ""}</div>
      </Row>
    </Link>
  );
};

export default DoorListingRow;


