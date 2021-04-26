import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/date_util";

import styled from "styled-components";

const Row = styled.div`
  display: flex;
`;


const FrameListingRow = props => {
  if (!props.frameListing) return null;
  const { frameListing } = props;
  const url = frameListing
    ? `/frameListings/${frameListing.id}`
    : `/frameListings/${frameListing.id}/create`;

  return (
    <Link to={url}>
      <Row>
        {`Page Number - ${frameListing.pageNumber}`}
      </Row>
    </Link>
  );
};

export default FrameListingRow;


