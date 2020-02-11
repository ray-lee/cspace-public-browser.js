import Immutable from 'immutable';
import { getItemShortID } from 'cspace-refname';

import {
  SET_MEDIA,
} from '../constants/actionCodes';

const setMedia = (state, action) => {
  const mediaCsids = action.payload;

  const {
    institutionId,
    refName,
  } = action.meta;

  const shortId = getItemShortID(refName) || refName;

  return state.setIn([shortId, 'media', institutionId], Immutable.fromJS(mediaCsids));
};

export default (state = Immutable.Map(), action) => {
  switch (action.type) {
    case SET_MEDIA:
      return setMedia(state, action);
    default:
      return state;
  }
};

export const get = (state, refName, institutionId) => {
  const shortId = getItemShortID(refName) || refName;

  if (typeof institutionId === 'undefined') {
    return state.getIn([shortId, 'media']);
  }

  return state.getIn([shortId, 'media', institutionId]);
};
