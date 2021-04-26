import * as APIUtil from "../util/frame_listing_api_util";

export const RECEIVE_FRAME_LISTING = "RECEIVE_FRAME_LISTING";
export const RECEIVE_FRAME_LISTINGS = "RECEIVE_FRAME_LISTINGS";
export const RECEIVE_FRAME_LISTING_ERRORS = "RECEIVE_FRAME_LISTING_ERRORS";

export const receiveFrameListing = frameListing => {
  return {
    type: RECEIVE_FRAME_LISTING,
    frameListing
  };
};

export const receiveFrameListings = frameListings => {
  return {
    type: RECEIVE_FRAME_LISTINGS,
    frameListings
  };
};

export const receiveFrameListingErrors = errors => {
  return {
    type: RECEIVE_FRAME_LISTING_ERRORS,
    errors
  };
};

export const submitFrameListing = orderId=> dispatch =>
  APIUtil.submitFrameListing(orderId).then(
    orderId => dispatch(receiveFrameListing(orderId)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchFrameListings = () => dispatch => {
  return APIUtil.fetchFrameListings().then(
    frameListings => {
      return dispatch(receiveFrameListings(frameListings));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

export const fetchFrameListing = frameListingId => dispatch => {
  return APIUtil.fetchFrameListing(frameListingId).then(
    frameListing => {
      return dispatch(receiveFrameListing(frameListing));
    },
    err => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};
