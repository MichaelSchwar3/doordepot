export const UPDATE_DOOR_FORM = "UPDATE_DOOR_FORM";
export const UPDATE_DOOR_TAGS = "UPDATE_DOOR_TAGS";
export const UPDATE_DOOR_COMMON = "UPDATE_DOOR_COMMON";

export const updateDoorForm = door => {
  return {
    type: UPDATE_DOOR_FORM,
    door
  };
};

export const updateDoorTags = tags => {
  return {
    type: UPDATE_DOOR_TAGS,
    tags
  };
};

export const updateDoorCommon = common => {
  return {
    type: UPDATE_DOOR_COMMON,
    common
  };
};
