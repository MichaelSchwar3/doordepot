import * as APIUtil from "../util/door_api_util";

export const RECEIVE_DOOR = "RECEIVE_DOOR";
export const RECEIVE_DOORS = "RECEIVE_DOORS";
export const RECEIVE_DOOR_ERRORS = "RECEIVE_DOOR_ERRORS";

export const receiveDoor = (door) => {
  return {
    type: RECEIVE_DOOR,
    door,
  };
};

export const receiveDoors = (doors) => {
  return {
    type: RECEIVE_DOORS,
    doors,
  };
};

export const receiveDoorErrors = (errors) => {
  return {
    type: RECEIVE_DOOR_ERRORS,
    errors,
  };
};

export const submitDoor = (doors, doorListingId) => (dispatch) =>
  APIUtil.submitDoor(doors, doorListingId).then(
    (doors) => dispatch(receiveDoors(doors)),
    (err) => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchDoors = (doorListingId) => (dispatch) => {
  return APIUtil.fetchDoors(doorListingId).then(
    (doors) => {
      return dispatch(receiveDoors(doors));
    },
    (err) => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};

export const fetchDoor = (doorId) => (dispatch) => {
  return APIUtil.fetchDoor(doorId).then(
    (door) => {
      return dispatch(receiveDoor(door));
    },
    (err) => {
      return dispatch(receiveErrors(err.responseJSON));
    }
  );
};
