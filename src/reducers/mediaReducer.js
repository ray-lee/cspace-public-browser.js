import Immutable from 'immutable';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

const setMedia = (state, action) => {
  const mediaCsids = action.payload;

  const {
    institutionId,
    referenceValue,
  } = action.meta;

  return state.setIn([referenceValue, 'media', institutionId], Immutable.fromJS(mediaCsids));
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_MEDIA:
      return setMedia(state, action);
    default:
      return state;
  }
};

export const get = (state, referenceValue, institutionId) => {
  if (typeof institutionId === 'undefined') {
    return state.getIn([referenceValue, 'media']);
  }

  return state.getIn([referenceValue, 'media', institutionId]);
};
