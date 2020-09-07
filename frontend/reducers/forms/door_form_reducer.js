import { UPDATE_DOOR_FORM, UPDATE_DOOR_TAGS, UPDATE_DOOR_COMMON } from '../../actions/door_form_actions';

const doorFormReducer = (state = { tags: {}, common: {} }, action) => {
  Object.freeze(state);
  switch (action.type) {
    case UPDATE_DOOR_FORM:
      return Object.assign({}, state, { [action.door.letter]: action.door });
    case UPDATE_DOOR_TAGS:
      const newState = Object.assign({}, state)
      const newTags = Object.assign({}, newState["tags"], { [action.tags.letter]: action.tags })
      newState["tags"] = newTags
      return newState;
    case UPDATE_DOOR_COMMON:
      const commonState = Object.assign({}, state)
      const newCommon = Object.assign({}, commonState["common"], action.common)
      commonState["common"] = newCommon
      return commonState;
    default:
      return state;
  }
};

export default doorFormReducer;