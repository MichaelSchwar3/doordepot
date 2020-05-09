import * as APIUtil from "../util/door_order_api_util";

export const RECEIVE_DOOR = "RECEIVE_DOOR";
export const RECEIVE_DOOR_ERRORS = "RECEIVE_DOOR_ERRORS";
export const RECEIVE_DOOR_FORM_OPTIONS = 'RECEIVE_DOOR_FORM_OPTIONS';

export const receiveDoorFormOptions = (formOptions) => {
  return {
    type: RECEIVE_DOOR_FORM_OPTIONS,
    formOptions
  };
}

export const receiveDoorErrors = errors => {
  return {
    type: RECEIVE_DOOR_ERRORS,
    errors
  };
};


export const submitDoorOrder = order => dispatch =>
  APIUtil.submitDoorOrder(order).then(
    order => dispatch(receiveDoorOrder(order)),
    err => dispatch(receiveErrors(err.responseJSON))
  );

export const fetchDoorOrderOptions = () => dispatch =>
  APIUtil.fetchDoorOrderOptions().then(
    formOptions => dispatch(receiveDoorFormOptions(formOptions)),
    err => dispatch(receiveErrors(err.responseJSON))
  );
