import * as APIUtil from "../util/door_listing_api_util";

export const RECEIVE_DOOR_LISTING = "RECEIVE_DOOR_LISTING";
export const RECEIVE_DOOR_LISTINGS = "RECEIVE_DOOR_LISTINGS";
export const RECEIVE_DOOR_LISTING_ERRORS = "RECEIVE_DOOR_LISTING_ERRORS";

export const receiveDoorListing = doorListing => {
  return {
    type: RECEIVE_DOOR_LISTING,
    doorListing
  };
};

export const receiveDoorListings = doorListings => {
  return {
    type: RECEIVE_DOOR_LISTINGS,
    doorListings
  };
};

export const receiveDoorListingErrors = errors => {
  return {
    type: RECEIVE_DOOR_LISTING_ERRORS,
    errors
  };
};

export const submitDoorListing = doorListing => dispatch =>
  APIUtil.submitDoorListing(doorListing).then(
    doorListing => dispatch(receiveDoorListing(doorListing)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchDoorListings = () => dispatch => {
  return APIUtil.fetchDoorListings().then(
    doorListings => {
      return dispatch(receiveDoorListings(doorListings));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

export const fetchDoorListing = doorListingId => dispatch => {
  return APIUtil.fetchDoorListing(doorListingId).then(
    doorListing => {
      return dispatch(receiveDoorListing(doorListing));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};
