import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";

import styled from "styled-components";

const Row = styled.div`
  display: flex;
`;


const DoorListingRow = props => {
  if (!props.doorListing) return null;
  const { doorListing } = props;
  const url = doorListing
    ? `/doorListings/${doorListing.id}`
    : `/doorListings/${doorListing.id}/create`;

  return (
    <Link to={url}>
      <Row>
        {`Page Number - ${doorListing.pageNumber}`}
      </Row>
    </Link>
  );
};

export default DoorListingRow;


